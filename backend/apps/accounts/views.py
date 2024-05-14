from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.utils.timezone import now
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from djoser.views import UserViewSet as DjoserViewSet
from djoser.compat import get_user_email
from djoser import signals
from djoser.conf import settings
from apps.core import filters
from . import serializers
from .email import InviteEmail


class UserViewSet(DjoserViewSet):
    """
    Implementation of [Djoser](https://djoser.readthedocs.io/en/latest/index.html) authentication endpoints.
    """

    filterset_fields = {
        "id": filters.ID_FILTERS,
    }
    search_fields = ["email", "first_name", "last_name"]

    def get_queryset(self):
        user = self.request.user
        queryset = super(DjoserViewSet, self).get_queryset()
        id_filters = map(
            lambda key: self.request.query_params.get(f"id__{key}", None),
            filters.ID_FILTERS,
        )
        id_filters = list(id_filters) + [self.request.query_params.get("id", None)]
        if (
            settings.HIDE_USERS
            and self.action == "list"
            and not user.is_staff
            and not any(id_filters)
        ):
            queryset = queryset.filter(pk=user.pk)
        return queryset

    def get_permissions(self):
        if self.action == "invite":
            self.permission_classes = [IsAdminUser]
        if self.action == "invite_confirm":
            self.permission_classes = [AllowAny]
        elif self.action == "resend_invite":
            self.permission_classes = settings.PERMISSIONS.password_reset
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "invite":
            return serializers.InviteSerializer
        if self.action == "invite_confirm":
            return serializers.InviteConfirmSerializer
        if self.action == "resend_invite":
            return settings.SERIALIZERS.password_reset
        return super().get_serializer_class()

    @action(["post"], detail=False)
    def invite(self, request, *args, **kwargs):
        """
        Only available to admins. Allows app administrators to invite other administrators to the platform.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        try:
            # Check if user doesn't exist already
            user = get_user_model().objects.get(email=email)
            content = {
                "detail": _("User can't be invited, they already have an account.")
            }
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        except get_user_model().DoesNotExist:
            # Create user
            user = get_user_model().objects.create_staff(email=email)

        user.is_active = False
        user.save()

        context = {"user": user}
        to = [get_user_email(user)]
        InviteEmail(self.request, context).send(to)

        content = {"email": email}
        return Response(content, status=status.HTTP_201_CREATED)

    @action(["post"], detail=False)
    def invite_confirm(self, request, *args, **kwargs):
        """
        Lets an admin accept an invite, set a password, and activate the account.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.user

        # Set password
        user.set_password(serializer.validated_data["new_password"])
        if hasattr(serializer.user, "last_login"):
            user.last_login = now()

        # Activate
        user.is_active = True
        user.save()

        signals.user_activated.send(
            sender=self.__class__, user=user, request=self.request
        )

        if settings.SEND_CONFIRMATION_EMAIL:
            context = {"user": user}
            to = [get_user_email(user)]
            settings.EMAIL.confirmation(self.request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(["post"], detail=False)
    def resend_invite(self, request, *args, **kwargs):
        """Sends a new invite in case the previous one expired or wasn't received."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(
                email=serializer.validated_data["email"],
                is_active=False,
                last_login=None,
            )
        except UserModel.DoesNotExist:
            user = None

        if user:
            context = {"user": user}
            to = [get_user_email(user)]
            InviteEmail(self.request, context).send(to)

        return Response(status=status.HTTP_204_NO_CONTENT)

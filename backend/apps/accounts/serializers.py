from rest_framework import serializers
from djoser.serializers import UidAndTokenSerializer, PasswordSerializer
from django.contrib.auth import get_user_model
from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings

User = get_user_model()


class InviteSerializer(serializers.Serializer):
    email = serializers.EmailField()


class InviteConfirmSerializer(UidAndTokenSerializer, PasswordSerializer):
    pass


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", settings.LOGIN_FIELD]
        read_only_fields = (settings.LOGIN_FIELD,)

    def update(self, instance, validated_data):
        email_field = get_user_email_field_name(User)
        instance.email_changed = False
        if settings.SEND_ACTIVATION_EMAIL and email_field in validated_data:
            instance_email = get_user_email(instance)
            if instance_email != validated_data[email_field]:
                instance.is_active = False
                instance.email_changed = True
                instance.save(update_fields=["is_active"])
        return super().update(instance, validated_data)

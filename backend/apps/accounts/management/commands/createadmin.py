import os
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djoser.compat import get_user_email
from apps.accounts.email import InviteEmail


class Command(BaseCommand):
    help = "Checks for an admin. If not found, it sends an invite to the email in the corresponding environment variable."

    def handle(self, *args, **options):
        admin_var = "INIT_ADMIN"

        UserModel = get_user_model()

        if UserModel.objects.filter(is_staff=True).first():
            self.stdout.write(
                f"[INFO] Staff member(s) already exists. Ignoring command."
            )
            return

        admin_email = os.getenv(admin_var, None)

        if not admin_email:
            self.stdout.write(
                f"[INFO] '{admin_var}' has not been set. Ignoring command."
            )
            return

        user = UserModel.objects.create_staff(email=admin_email)
        user.is_active = False
        user.save()

        context = {"user": user}
        to = [get_user_email(user)]
        InviteEmail(None, context).send(to)
        self.stdout.write(f"[INFO] Admin invited successfully.")

"Core validators"
import string
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from rest_framework import serializers


def list_not_empty(value):
    "Validator for empty lists"
    if not value:
        raise serializers.ValidationError(_("This field can't be empty."))


class IncludeAtLeastValidator:
    """
    Password validator that requires the password to include at least `count`
    instances of any of the characters in the `character_list`.
    """

    def __init__(self, character_list: list, count: int = 1):
        self.count = count
        self.character_list = character_list

    def validate(self, password, user=None):
        "Performs the logic to validate the password."
        chars_found = len(list(filter(lambda l: l in self.character_list, password)))
        if chars_found < self.count:
            raise self.get_error()

    def get_error(self):
        "Overwrite to return a custom validation error."
        return ValidationError(
            _(
                (
                    "This password must contain at least %(count)d of "
                    "the following characters: %(chars)s"
                )
            ),
            code="password_missing_chars",
            params={"count": self.count, "chars": " ".join(self.character_list)},
        )

    def get_help_text(self):
        "Returns help text."
        return _(
            "Your password must contain at least %(count)d of the following characters: %(chars)s"
            % {"count": self.count, "chars": " ".join(self.character_list)}
        )


class IncludeNumberValidator(IncludeAtLeastValidator):
    "Require at least `count` lowercase letters."

    def __init__(self, count: int = 1):
        super().__init__(list("0123456789"), count)

    def get_error(self):
        "Validation error."
        return ValidationError(
            _("This password must contain at least %(count)d number."),
            code="password_missing_number",
            params={"count": self.count},
        )

    def get_help_text(self):
        "Returns help text."
        return _(f"Your password must contain at least {self.count} number.")


class IncludeLowercaseValidator(IncludeAtLeastValidator):
    "Require at least `count` lowercase letters."

    def __init__(self, count: int = 1):
        super().__init__(list(string.ascii_lowercase), count)

    def get_error(self):
        "Validation error."
        return ValidationError(
            _("This password must contain at least %(count)d lowercase letter."),
            code="password_missing_lowercase",
            params={"count": self.count},
        )

    def get_help_text(self):
        "Returns help text."
        return _(f"Your password must contain at least {self.count} lowercase letter.")


class IncludeUppercaseValidator(IncludeAtLeastValidator):
    "Require at least `count` uppercase letters."

    def __init__(self, count: int = 1):
        super().__init__(list(string.ascii_uppercase), count)

    def get_error(self):
        "Validation error."
        return ValidationError(
            _("This password must contain at least %(count)d uppercase letter."),
            code="password_missing_uppercase",
            params={"count": self.count},
        )

    def get_help_text(self):
        "Returns help text."
        return _(f"Your password must contain at least {self.count} uppercase letter.")


class IncludeSpecialValidator(IncludeAtLeastValidator):
    "Require at least `count` special characters."

    def __init__(self, count: int = 1):
        super().__init__(list(string.punctuation), count)

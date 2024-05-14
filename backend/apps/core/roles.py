from rest_framework_roles.roles import is_user, is_anon, is_admin


def is_staff(request, view):
    return request.user.is_staff or is_admin(request, view)


ROLES = {
    # Django out-of-the-box
    "admin": is_staff,
    "user": is_user,
    "anon": is_anon,
}

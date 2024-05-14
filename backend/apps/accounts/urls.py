from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register("api/v1/accounts/users", views.UserViewSet, "accounts-users")

urlpatterns = [
    path("api/auth/", include("djoser.urls.authtoken")),
]

urlpatterns += router.urls

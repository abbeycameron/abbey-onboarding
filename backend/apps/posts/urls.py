from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()

router.register("api/v1/posts", views.PostViewSet, "posts")

urlpatterns = router.urls

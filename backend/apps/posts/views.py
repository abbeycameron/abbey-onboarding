from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer
from .models import Post
from apps.core import filters


def is_owner(request, view):
    return request.user == view.get_object().owner


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = [AllowAny]
    filterset_fields = {
        "id": filters.ID_FILTERS,
        "created": filters.DATETIME_FILTERS,
        "owner": filters.ID_FILTERS,
    }
    search_fields = ["content"]
    ordering_fields = ["owner__first_name", "content", "created", "modified"]

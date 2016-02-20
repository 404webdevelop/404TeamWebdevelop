from rest_framework import routers
from author.views import UserViewSet
from post.views import PostViewSet, CommentViewSet, ImageViewSet


router = routers.DefaultRouter()
router.register(r'post/posts', PostViewSet)
router.register(r'post/comments', CommentViewSet)
router.register(r'post/images', ImageViewSet)
router.register(r'author/authors', UserViewSet)

from rest_framework import routers
from author.api.views import AuthorViewSet
from post.views import PostViewSet, CommentViewSet, ImageViewSet


router = routers.DefaultRouter()
router.register(r'authors', AuthorViewSet)

router.register(r'post/posts', PostViewSet)
router.register(r'post/comments', CommentViewSet)
router.register(r'post/images', ImageViewSet)

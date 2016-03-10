from rest_framework import routers
from author.api.views import AuthorViewSet
from post.views import PostViewSet, CommentViewSet, ImageViewSet, PostByAuthor, MyPosts, CommentByPost
from follower.views import FollowViewSet


router = routers.DefaultRouter()
router.register(r'authors', AuthorViewSet)
router.register(r'post/posts/author', PostByAuthor, base_name='post_by_author')
router.register(r'post/posts/mine', MyPosts, base_name='my_posts')
router.register(r'post/posts/(?P<post_id>\d+)/comments', CommentByPost, base_name='comment_by_post')
router.register(r'post/posts', PostViewSet)
router.register(r'post/comments', CommentViewSet)
router.register(r'post/images', ImageViewSet)
router.register(r'follows', FollowViewSet)

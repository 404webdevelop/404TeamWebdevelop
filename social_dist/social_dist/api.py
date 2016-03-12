from rest_framework import routers
from author.api.views import AuthorViewSet
from post.views import PostViewSet, CommentViewSet, ImageViewSet, PostByAuthor, MyPosts, CommentByPost
from follower.views import FollowViewSet, FriendViewSet

router = routers.DefaultRouter()

# Post views
router.register(r'author/posts', PostViewSet, base_name='visible_posts')
router.register(r'author/myposts', MyPosts, base_name='my_posts') # not required by the spec
router.register(r'posts', PostViewSet)
router.register(r'author/(?P<author_id>[0-9a-f\-]+)/posts', PostByAuthor, base_name='post_by_author')

# Comment views
router.register(r'posts/(?P<post_id>[0-9a-f\-]+)/comments', CommentByPost, base_name='comment_by_post')
router.register(r'comments', CommentViewSet) # not required by the spec

# Image views
router.register(r'images', ImageViewSet)

# Author views
router.register(r'author', AuthorViewSet)

# Friend views TODO
router.register(r'follow', FollowViewSet)
router.register(r'friend/(?P<author_id_1>[0-9a-f\-]+)/(?P<author_id_2>[0-9a-f\-]+)', FriendViewSet)

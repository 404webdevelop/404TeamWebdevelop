from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers

from post.views import PostViewSet, CommentViewSet
from author.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'post/posts', PostViewSet)
router.register(r'post/comments', CommentViewSet)
router.register(r'author/authors', UserViewSet)

urlpatterns = [
    # Examples:
    # url(r'^$', 'social_dist.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='test.html')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^author/', include('author.urls')),

    url(r'^api/', include(router.urls)),
    url(r'^api/post/', include('post.urls')),
]

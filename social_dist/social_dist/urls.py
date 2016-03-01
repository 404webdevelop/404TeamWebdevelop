from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login
from django.views.generic import TemplateView
from rest_framework import routers

from post.views import PostViewSet, CommentViewSet, ImageViewSet
from author.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'post/posts', PostViewSet)
router.register(r'post/comments', CommentViewSet)
router.register(r'post/images', ImageViewSet)
router.register(r'author/authors', UserViewSet)

urlpatterns = [
    # Examples:
    # url(r'^$', 'social_dist.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='home.html'), name="home"),
    url(r'^about$', TemplateView.as_view(template_name='about.html'), name="about"),
    url(r'^addfriends$', TemplateView.as_view(template_name='addfriends.html'), name="addfriends"),
    url(r'^connect$', TemplateView.as_view(template_name='connect.html'), name="connect"),
    url(r'^createpost$', TemplateView.as_view(template_name='createpost.html'), name="createpost"),
    url(r'^friends$', TemplateView.as_view(template_name='friends.html'), name="friends"),
    url(r'^posted$', TemplateView.as_view(template_name='posted.html'), name="posted"),
    url(r'^profile$', TemplateView.as_view(template_name='profile.html'), name="profile"),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^accounts/login/.*', login),
    url(r'^accounts/password_reset/$', 'django.contrib.auth.views.password_reset', name="reset_password"),
    # url(r'^accounts/passwordsent/$', 'django.contrib.auth.views.password_reset_done', name='password_reset_done'),

    url(r'^author/', include('author.urls')),

    url(r'^api/', include(router.urls)),

    url(r'^post/debug/', include('post.debug_urls')),
]

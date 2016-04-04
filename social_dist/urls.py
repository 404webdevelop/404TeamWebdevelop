from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required
from follower.views import FriendRequestAPIView, FriendlistViewSet, FriendViewSet, FriendofFriendAPIView
from post.views import FOAFPostView;
from api import router


urlpatterns = [
    url(r'^signup$', TemplateView.as_view(template_name='user/signup.html'), name="signup"),
    url(r'^login/.*', 'django.contrib.auth.views.login', kwargs={'template_name': 'user/login.html'}, name="login"),
    url(r'^logout/*', 'django.contrib.auth.views.logout', kwargs={'next_page': 'login'}, ),
    url(r'^password_reset/$', 'django.contrib.auth.views.password_reset', name="reset_password"),

    url(r'^$', login_required(TemplateView.as_view(template_name='index.html')), name="home"),
    url(r'^home$', login_required(TemplateView.as_view(template_name='index.html')), name="home"),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls)),
    url(r'^api/friendrequest', FriendRequestAPIView.as_view()),
    url(r'friends/(?P<author_id_1>[0-9a-f\-]+)/(?P<author_id_2>[0-9a-f\-]+)', FriendViewSet.as_view()),
    url(r'friends/(?P<author_id>[0-9a-f\-]+)', FriendlistViewSet.as_view()),
    url(r'friendoffriend/(?P<author_id>[0-9a-f\-]+)', FriendofFriendAPIView.as_view()),

    url(r'api/getpost/', FOAFPostView.as_view()),

    # demo
    url(r'^make_post/', login_required(TemplateView.as_view(template_name='post/make_post.html')), name='make-post'),
    url(r'^view_post/.*', login_required(TemplateView.as_view(template_name='post/view_post.html')), name='view-post'),
    url(r'^profile/', login_required(TemplateView.as_view(template_name='user/profile_image.html')), name='profile-image'),
]

from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.authtoken import views
from django.contrib.auth.decorators import login_required

from api import router


urlpatterns = [
    url(r'^api-token/', views.obtain_auth_token),

    url(r'^$', login_required(TemplateView.as_view(template_name='home.html')), name="home"),
    url(r'^signup$', TemplateView.as_view(template_name='user/signup.html'), name='signup'),
    url(r'^about$', login_required(TemplateView.as_view(template_name='about.html')), name="about"),
    url(r'^addfriends$', login_required(TemplateView.as_view(template_name='addfriends.html')), name="addfriends"),
    url(r'^connect$', login_required(TemplateView.as_view(template_name='connect.html')), name="connect"),
    url(r'^createpost$', login_required(TemplateView.as_view(template_name='createpost.html')), name="createpost"),
    url(r'^friends$', login_required(TemplateView.as_view(template_name='friends.html')), name="friends"),
    url(r'^posted$', login_required(TemplateView.as_view(template_name='posted.html')), name="posted"),
    url(r'^profile$', login_required(TemplateView.as_view(template_name='profile.html')), name="profile"),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^accounts/login/.*', 'django.contrib.auth.views.login', kwargs={'template_name': 'user/login.html'}, ),
    url(r'^accounts/signup/.*', TemplateView.as_view(template_name='signup.html'), name="signup"),
    url(r'^accounts/password_reset/$', 'django.contrib.auth.views.password_reset', name="reset_password"),

    url(r'^api-token/', views.obtain_auth_token),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls)),

    url(r'^post/debug/', include('post.debug_urls')),
]

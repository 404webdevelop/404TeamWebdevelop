from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.authtoken import views
from django.contrib.auth.decorators import login_required

from api import router


urlpatterns = [
    url(r'^api-token/', views.obtain_auth_token),

    url(r'^$', TemplateView.as_view(template_name='home.html'), name="home"),
    url(r'^home$', TemplateView.as_view(template_name='home.html'), name="home"),
    url(r'^about$', TemplateView.as_view(template_name='about.html'), name="about"),
    url(r'^addfriends$',TemplateView.as_view(template_name='addfriends.html'), name="addfriends"),
    url(r'^friends$', TemplateView.as_view(template_name='friends.html'), name="friends"),
    url(r'^posted$', TemplateView.as_view(template_name='posted.html'), name="posted"),
    url(r'^profile$', login_required(TemplateView.as_view(template_name='profile.html')), name="profile"),
    url(r'^signup$', login_required(TemplateView.as_view(template_name='signup.html')), name="signup"),
    url(r'^demo-signup$', TemplateView.as_view(template_name='user/signup.html'), name='signup'),
    url(r'^demo-update$', TemplateView.as_view(template_name='user/update.html'), name='update'),
    url(r'^network$', TemplateView.as_view(template_name='network.html'), name='my-netowkr'),

    url(r'^posts', TemplateView.as_view(template_name='post/post_list.html'), name='my-post'),



    url(r'^admin/', include(admin.site.urls)),

    url(r'^login/.*', 'django.contrib.auth.views.login', kwargs={'template_name': 'user/login.html'}, name="login"),
    url(r'^logout/*', 'django.contrib.auth.views.logout', kwargs={'next_page': 'login'}, ),
    url(r'^password_reset/$', 'django.contrib.auth.views.password_reset', name="reset_password"),

    url(r'^api-token/', views.obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls)),
    url(r'^post/debug/', include('post.debug_urls')),
]

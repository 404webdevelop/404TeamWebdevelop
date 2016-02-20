from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth.views import login
from django.views.generic import TemplateView

from api import router


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='test.html')),

    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^author/', include('author.urls')),
    url(r'^accounts/login/.*', login),
    url(r'^accounts/password_reset/$', 'django.contrib.auth.views.password_reset', name="reset_password"),
    # url(r'^accounts/passwordsent/$', 'django.contrib.auth.views.password_reset_done', name='password_reset_done'),

    url(r'^post/debug/', include('post.debug_urls')),
]
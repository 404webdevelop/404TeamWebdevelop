from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.authtoken import views

from api import router


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='test.html')),
    url(r'^api-token/', views.obtain_auth_token),
    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^post/debug/', include('post.debug_urls')),
]

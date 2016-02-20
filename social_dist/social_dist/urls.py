from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

from api import router


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='test.html')),

    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^author/', include('author.urls')),
    url(r'^post/debug/', include('post.debug_urls')),
]
from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    # Examples:
    # url(r'^$', 'social_dist.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='test.html')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^author/', include('author.urls')),
    url(r'^post/', include('post.urls')),

    # url(r'^api/', include('rest_framework.urls', namespace='rest_framework')), # no idea what this is for
]

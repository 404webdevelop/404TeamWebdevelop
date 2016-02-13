from django.conf.urls import url
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='author/index.html')),

    url(r'^signup$', views.signup_view),
    url(r'^login$', views.login_view),
    url(r'^profile$', views.profile_view),
    url(r'^logout$', views.logout),
]
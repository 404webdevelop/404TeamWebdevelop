from django.conf.urls import url
from django.views.generic import TemplateView
from django.contrib.auth.views import login, logout, password_reset, password_reset_done


from . import views

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='author/index.html')),

    url(r'^signup/$', views.signup_view),

    url(
        r'^login/$', 
        login
    ),
    url(
        r'^password_reset/$', 
        password_reset,
        name="reset_password"
    ),
    url(
        r'^password_reset_done/$', 
        password_reset_done,
        name="password_reset_done"
    ),
    url(r'^logout/$', logout),
   
    url(r'^profile/$', views.profile_view, name="author_profile"),
]
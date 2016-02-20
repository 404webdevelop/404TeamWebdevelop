from django.conf.urls import url
from django.contrib.auth.views import login, logout, password_change, password_change_done


from . import views

urlpatterns = [
    url(
        r'^$',
        views.home_view,
        name="home"
    ),
    url(
        r'^signup/$',
        views.signup_view,
        name="signup"
    ),
    url(
        r'^login/$', 
        login,
        name='login',
        kwargs={'template_name': 'author/login.html'}
    ),
    url(
        r'^password_change/$',
        password_change,
        name="password_change",
        kwargs={
            'template_name': 'author/password_change_form.html',
            'post_change_redirect': 'authors:password_change_done',
        }
    ),
    url(
        r'^password_change_done/$',
        password_change_done,
        name="password_change_done",
        kwargs={
             'template_name': 'author/password_change_done.html'
        }
    ),
    url(
        r'^logout/$',
        logout,
        name="logout",
        kwargs={'next_page': '/author/'}
    ),
    url(
        r'^(?P<author_id>[0-9]+)/$',
        views.public_profile,
        name='public'
    ),
]

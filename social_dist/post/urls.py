from django.conf.urls import url, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'comments', views.CommentViewSet)

urlpatterns = [
    url(r'^images/(?P<image_id>[0-9]+)/$', views.image_view),
    url(r'^', include(router.urls)),
]
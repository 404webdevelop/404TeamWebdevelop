from follower.models import Follows, FollowManager
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from follower.serializers import FollowSerializer

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follows.followManager.all()
    serializer_class = FollowSerializer
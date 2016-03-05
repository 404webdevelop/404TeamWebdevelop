from follower.models import Follow
from follower.serializers import CurrentUserSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status

class FollowerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Followers to be viewed or edited.
    """
    queryset = Follow.objects.all().order_by('-date_created')
    serializer_class = CurrentUserSerializer
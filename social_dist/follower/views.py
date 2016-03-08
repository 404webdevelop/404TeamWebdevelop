from follower.models import Follows, FollowManager, Friends
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from follower.serializers import FollowSerializer, FriendsSerializer

class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follows.objects.all()
    serializer_class = FollowSerializer


class FriendsViewSet(viewsets.ModelViewSet):
	queryset = Friends.objects.all()
	serializer_class = FriendsSerializer

class FriendViewSet(viewsets.ModelViewSet):
	queryset = Friends.objects.all()
	serializer_class = FriendsSerializer

	def get_queryset(self):
		user1 = self.kwargs['username1']
		user2 = self.kwargs['username2']
		return Friends.objects.get_api_friends(user1, user2)
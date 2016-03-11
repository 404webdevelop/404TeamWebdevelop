from follower.models import Follows, FollowManager
from django.http import HttpResponse
from rest_framework.decorators import detail_route, list_route
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from follower.serializers import FollowSerializer
class FollowViewSet(viewsets.ModelViewSet):
	queryset = Follows.objects.all()
	serializer_class = FollowSerializer
	@detail_route(methods=["GET"])
	def followers(self, request, **kwargs):
		follower = Follows.objects.getFollowers(self.kwargs['pk'])
		response = HttpResponse(follower, content_type='json')
		return response
	@detail_route(methods=["GET"])
	def followings(self, request, **kwargs):
		follower = Follows.objects.getFollowing(self.kwargs['pk'])
		response = HttpResponse(follower, content_type='json')
		return response

	@detail_route(methods=["GET"])
	def friends(self, request, **kwargs):
		follower = Follows.objects.getFollowing(self.kwargs['pk'])
		followed = Follows.objects.getFollowers(self.kwargs['pk'])
		friend_list = list()
		for i in range(len(followed)):
			print i
			for j in range(len(follower)):	
				if followed[i].follower.username == follower[j].followed.username:
					friend_list.append(followed[i].follower.username)

		response = HttpResponse(friend_list, content_type='json')
		return response







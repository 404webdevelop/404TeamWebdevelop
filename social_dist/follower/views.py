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
	@list_route(methods=["GET"])
	def followers(self, request, **kwargs):
		user = Follows.objects.getFollowers(1)
		response = HttpResponse(user, content_type='json')
		return response







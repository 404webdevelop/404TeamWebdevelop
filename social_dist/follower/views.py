from follower.models import Follows, FollowManager
from django.http import HttpResponse
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication

from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from follower.serializers import FollowSerializer
from django.contrib.auth.models import User
from models import Follows


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follows.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [AllowAny, ]
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsAuthenticated, ]
        return super(FollowViewSet, self).get_permissions()

    def create(self, request, *args, **kwargs):
        username = unicode(request.user)
        me = User.objects.get_by_natural_key(username)
        following = User.objects.get_by_natural_key(request.data["following"])
        follow = Follows.objects.follow(me, following)
        follow_serializer = FollowSerializer(follow, context={'request': request})
        return Response(follow_serializer.data)

    @detail_route(methods=["GET"])
    def followers(self, request, **kwargs):
        queryset = Follows.objects.getFollowers(self.kwargs['pk'])
        serializer = FollowSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

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

    @list_route(methods=["GET"])
    def is_friend(self, request, **kwargs):
        request.GET["user1"]
        request.GET["user2"]
        pass


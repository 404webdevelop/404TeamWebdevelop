from follower.models import Follows, FollowManager
from author.models import  Author 
from author.api.serializers import UserSerializer
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
        me = Author.objects.get_by_natural_key(username)
        following = Author.objects.get_by_natural_key(request.data["following"])
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
        queryset = Follows.objects.getFollowing(self.kwargs['pk'])
        print queryset
        serializer = FollowSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=["GET"])
    def friends(self, request, **kwargs):
        follower_queryset = Follows.objects.getFollowing(self.kwargs['pk'])
        followed_queryset = Follows.objects.getFollowers(self.kwargs['pk'])
        friend_list = list()
        for i in range(len(followed_queryset)):
            for j in range(len(follower_queryset)):
                if followed_queryset[i].follower.username == follower_queryset[j].followed.username:
                    friend_list.append(followed_queryset[i].follower.username)
        follower_queryset.filter(Follows.follower.username in friend_list)
        print follower_queryset
#        friend_obj_list = list()
#        for friend_name in friend_list:
#            friend = User.objects.get_by_natural_key(friend_name)

#            serializer = UserSerializer(friend, context={'request': request})

        return Response('serializer')

    @list_route(methods=["GET"])
    def is_friend(self, request, **kwargs):
        result = False
        user_1_name= request.GET["user1"]
        user_2_name= request.GET["user2"]
        #print user_1_name
        #print "\n"+ user_2_name
        user_1 = User.objects.get_by_natural_key(user_1_name)
        user_2 = User.objects.get_by_natural_key(user_2_name)
        print user_1
        print user_2
        #print user_2.id
        result_case_one = Follows.objects.isFollowing(user_1, user_2)
        #print result_case_one
        result_case_two = Follows.objects.isFollowing(user_2, user_1)
        #print result_case_two
        if result_case_one and result_case_two:
            result = True
        else:
            result = False
        return HttpResponse(result)


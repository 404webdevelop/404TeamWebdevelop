from follower.models import Follows, FollowManager
from author.models import  Author 
from author.api.serializers import UserSerializer
from django.http import HttpResponse
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from permissions import CustomPermissions
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from follower.serializers import FollowSerializer
from django.contrib.auth.models import User
from models import Follows
from collections import OrderedDict
from requests.auth import HTTPBasicAuth

import json
import requests
import os

class FollowViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows followers to be viewed by author

    Usage: \n
      - `/follow/{author_id}/followers`
        - GET: list all author's followers
        - you cannot POST to this url
      - `/follow/{author_id}/followings`
        - GET: list all author's following author
        - you cannot POST to this url
    """
    queryset = Follows.objects.all()
    serializer_class = FollowSerializer
    permission_classes = [AllowAny, ]
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]


    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsAuthenticated, ]
        if self.action == 'update':
            self.permission_classes = [CustomPermissions,]
        return super(FollowViewSet, self).get_permissions()


    def create(self, request, *args, **kwargs):
        me = Author.objects.get(username=unicode(request.user))



        try:
            followed = request.data["followed"]
            remote_host = request.data['remote_author_host']
        except:
            remote_host = None

        current_domain = request.META['HTTP_HOST']


        if len(remote_host) > 1:

            # remote
            remote_id = request.data['remote_author_id']
            remote_name = request.data['remote_author_name']
            remote_url = request.data['remote_author_url']
            reqData = {
                "query":"friendrequest",
                "author": {
                    "id": str(me.id),
                    "host": current_domain,
                    "displayName": me.username
                },
                "friend": {
                    "id": remote_id,
                    "host": remote_host,
                    "displayName": remote_name,
                    "url":remote_url
                }
            }
            headers = {'content-type': 'application/json'}
            url = 'http://'+remote_host+'/api/friendrequest'
            data = json.dumps(reqData)
            # POST request here to make a friendrequest to the remote user.
            # example (hard code one):
            # response = requests.post(url, auth=HTTPBasicAuth('Qiang1', '1'), data=data, headers=headers)
            # make same post to local server
            follow = Follows.objects.create(follower=me)
            follow.remote_author_host = remote_host
            follow.remote_author_name = remote_name
            follow.remote_author_id   = remote_id
            follow.remote_author_url  = remote_url
            follow.save()
            follow_serializer = FollowSerializer(follow, context={'request': request})
            return Response(follow_serializer.data)
        else:
            # local
            following = Author.objects.get(id=request.data["followed"].split("/")[-2])
            follow = Follows.objects.follow(following, me)
            follow_serializer = FollowSerializer(follow, context={'request': request})

            return Response(follow_serializer.data)


    @detail_route(methods=["GET"])
    def localAuthorFollowers(self, request, **kwargs):
        queryset = Follows.objects.getLocalFollowers(self.kwargs['pk'])
        localSerializer = FollowSerializer(queryset, many=True, context={'request': request})
        return Response(localSerializer.data)


    @detail_route(methods=["GET"])
    def remoteauthorFollowers(self, request, **kwargs):
        queryset = Follows.objects.getRemoteFollowers(self.kwargs['pk'])
        remoteSerializer = FollowSerializer(queryset, many=True, context={'request': request})
        return Response(remoteSerializer.data)


    @detail_route(methods=["GET"])
    def localAuthorFollowings(self, request, **kwargs):
        queryset = Follows.objects.getLocalFollowings(self.kwargs['pk'])

        serializer = FollowSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


    @detail_route(methods=["GET"])
    def remoteAuthorFollowings(self, request, **kwargs):
        queryset = Follows.objects.getRemoteFollowings(self.kwargs['pk'])

        serializer = FollowSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


    @detail_route(methods=["GET"])
    def friends(self, request, **kwargs):

        #get all local author followings
        follower = Follows.objects.getLocalFollowings(self.kwargs['pk'])
        print 'local follower length: ' + str(len(follower))
        #get all local author followers
        followed = Follows.objects.getLocalFollowers(self.kwargs['pk'])
        serializer = FollowSerializer(followed, many=True, context={'request': request})

        print 'local followed length: ' + str(len(followed))

        #get all remote author followers
        remote_followed = Follows.objects.getRemoteFollowers(self.kwargs['pk'])     
        print 'remote followed length: ' + str(len(remote_followed))

        #get all remote author followeds
        remote_follower = Follows.objects.getRemoteFollowings(self.kwargs['pk'])
        print 'remote follower length: ' + str(len(remote_follower))

        friend_list = list()

        #local author is friend with another local author
        if (len(followed) != 0 and len(follower) != 0):
            for i in range(len(followed)):
                for j in range(len(follower)):
                    try:
                        if (followed[i].follower.username == follower[j].followed.username):
                            friend_list.append(followed[i].follower.id)
                    except:
                        if (followed[i].remote_author_id == follower[j].remote_author_id):
                            friend_list.append(followed[i].remote_author_id)

        #remote author is being friend with a local author
        if (len(remote_followed) != 0 and len(remote_follower) != 0):
            for i in range(len(remote_followed)):
                for j in range(len(remote_follower)): 
                    if remote_followed[i].follower.username == remote_follower[j].followed.username:
                        friend_list.append(remote_followed[i].follower.id)

        return Response(OrderedDict([
            ('query', 'friends'),
            ('author', self.kwargs['pk']),
            # Array of Author UUIDs who are friends
            ('authors', friend_list)
            ]))


    @list_route(methods=['GET', 'POST'])
    def pendingRequest(self, request, **kwargs):
        if request.user.is_anonymous():
            return Response({
                "message": "No user logged in"
            })
        if request.method == 'GET':
            current_author_id = request.user.id
            friend_list = allFriend(current_author_id)
            follower_object = Follows.objects.getLocalFollowers(current_author_id)

            follower_list = list()
            for i in range(len(follower_object)):
                try:
                    id = str(follower_object[i].follower.id)
                    follower_list.append(id)
                except:
                    follower_list.append(str(follower_object[i].remote_author_id))

            print follower_list
            for friend in friend_list:
                if friend in follower_list:
                    follower_list.remove(friend)
            print follower_list
            return Response('request')


class FriendViewSet(APIView):
    """
    API endpoint that checks two users relation

    Usage: \n
      - `/friend/{author_id_1}/{author_id_2}}`
        - GET: result of two users are friends
    """
    authentication_classes = [BasicAuthentication, ]
    permission_classes = (IsAuthenticated,)
    def get(self, request, author_id_1, author_id_2):
        #set default result is false
        result = False

        #check if two user are friends
        result_case_one = Follows.objects.isFollowing(author_id_1, author_id_2)
        result_case_two = Follows.objects.isFollowing(author_id_2, author_id_1)
        authors = [author_id_1, author_id_2]
        if result_case_one and result_case_two:
            result = True
        else:
            result = False
        return Response(OrderedDict([
            ('query', 'friends'),
            ('authors', authors),
            # boolean true or false
            ('friends', result)
            ]))


class FriendlistViewSet(APIView):
    """
    API endpoint that returns a list of friends.

    Usage: \n
      - `/friends/{author_id}`
        - GET: result of two users are friends
    """
    authentication_classes = [BasicAuthentication, ]
    permission_classes = (IsAuthenticated,)


    def get(self, request, author_id):
        #get all local author followings followers
        follower = Follows.objects.getLocalFollowings(author_id)
        #print 'local follower length: ' + str(len(follower))
        followed = Follows.objects.getLocalFollowers(author_id)
        #print 'local followed length: ' + str(len(followed))


        #get all author remote followers followeds
        remote_followed = Follows.objects.getRemoteFollowers(author_id)     
        #print 'remote followed length: ' + str(len(remote_followed))
        remote_follower = Follows.objects.getRemoteFollowings(author_id)
        #print 'remote follower length: ' + str(len(remote_follower))

        friend_list = list()

        #local author is friend with another local author
        if (len(followed) != 0 and len(follower) != 0):
            for i in range(len(followed)):
                for j in range(len(follower)):
                    try:
                        if (followed[i].follower.username == follower[j].followed.username):
                            friend_list.append(followed[i].follower.id)
                    except:
                        if (followed[i].remote_author_id == follower[j].remote_author_id):
                            friend_list.append(followed[i].remote_author_id)

        #remote author is being friend with a local author
        if (len(remote_followed) != 0 and len(remote_follower) != 0):
            for i in range(len(remote_followed)):
                for j in range(len(remote_follower)): 
                    if remote_followed[i].follower.username == remote_follower[j].followed.username:
                        friend_list.append(remote_followed[i].follower.id)

        return Response(OrderedDict([
            ('query', 'friends'),
            ('author', author_id),
            # Array of Author UUIDs who are friends
            ('authors', friend_list)
            ]))
    def post(self, request, author_id):
        pending_list = list()
        result_list = list()
        pending_list = request.data['authors']
        for id in pending_list:
            print 'friend: '
            print allFriend(id)
            checking_list = allFriend(id)
            if author_id in checking_list:
                result_list.append(id)
        return Response(OrderedDict([
            ('query', 'friends'),
            ('author', author_id),
            # Array of Author UUIDs who are friends
            ('authors', result_list)
            ]))

def allFriend(author_id):
    #get all local author followings followers
    follower = Follows.objects.getLocalFollowings(author_id)
    followed = Follows.objects.getLocalFollowers(author_id)


    #get all author remote followers followeds
    remote_followed = Follows.objects.getRemoteFollowers(author_id)
    remote_follower = Follows.objects.getRemoteFollowings(author_id)

    friend_list = list()

    #local author is friend with another local author
    if (len(followed) != 0 and len(follower) != 0):
        for i in range(len(followed)):
            for j in range(len(follower)):
                try:
                    if (followed[i].follower.username == follower[j].followed.username):
                        friend_list.append(str(followed[i].follower.id))
                except:
                    if (followed[i].remote_author_id == follower[j].remote_author_id):
                        friend_list.append(str(followed[i].remote_author_id))

    #remote author is being friend with a local author
    if (len(remote_followed) != 0 and len(remote_follower) != 0):
        for i in range(len(remote_followed)):
            for j in range(len(remote_follower)): 
                if remote_followed[i].follower.username == remote_follower[j].followed.username:
                    friend_list.append(str(remote_followed[i].follower.id))

    return friend_list




class FriendofFriendAPIView(APIView):

    def get(self, request, author_id):
        friend_list = list()
        friend_of_friend_list= list()
        # get this author firend list.
        friend_list = allFriend(author_id)
        # based on the author friend list, finding all friend of friend list
        if len(friend_list) > 0:
            for i in range(len(friend_list)):
                pendingID = friend_list[i]
                pendinglist = allFriend(pendingID)
                for j in pendinglist:
                    friend_of_friend_list.append(j)
            # TODO: need a remote GET request here to get all remote users friend list
            #       then compare this list with the author friend list. (friend of a friend
            #       cannot be a friend of this author)

        friend_of_friend_list.remove(author_id)
        return Response(OrderedDict([
            ('query', 'friend of friend'),
            ('author', author_id),
            # Array of Author UUIDs who are friends
            ('authors', friend_of_friend_list)
            ]))




class FriendRequestAPIView(APIView):
    """
    API endpoint that create a friend request to the target

    Usage: \n
      - `/friendrequest/`
        - POST: post a friend request

    """
    authentication_classes = [BasicAuthentication, ]
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        author_id = request.data['author']['id']
        friend_id = request.data['friend']['id']

        if friend_id is not None:
            try:
                friend = Author.objects.get(id=friend_id)

            except:
                return Response({
                    'err': 'user not exist'
                })

        if author_id is not None:
            try:
                author = Author.objects.get(id=author_id)
                return Response({
                    'err': 'uuid duplicated, really?'
                })
            except:
                author = request.data['author']
                remote_url = author['host'] + author['id']
                follow = Follows.objects.create(followed=friend)
                
                follow.remote_author_host = author['host']
                follow.remote_author_name = author['displayName']
                follow.remote_author_id   = author_id
                follow.remote_author_url  = remote_url

                follow.save()
                return Response({
                    'success': True
                })






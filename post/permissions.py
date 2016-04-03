from rest_framework import permissions
from .models import Post, Image, Comment
from django.contrib.auth.models import AnonymousUser
from author.models import Author
from follower.models import Follows
from follower.views import allFriend
from remotes.utils import *

def AreFriends(user, other_user):
    return Follows.objects.isFollowing(user, other_user) and Follows.objects.isFollowing(other_user, user)

def AreFoaf(user, other_user):
    """
    This function is for LOCAL foaf check
    """
    if AreFriends(user, other_user):
        return True

    friends1 = set(allFriend(user.id))
    friends2 = set(allFriend(other_user.id))
    intersect = friends1.intersection(friends2)
    if len(intersect) > 0:
        return True

    return False

def CanViewRemotePost(post, user):
    if post.visibility in ['PRIVATE', 'SERVERONLY']:
        return False
    if post.visibility == 'PUBLIC':
        return True

    if 'author' not in post:
        return False
    if post.visibility == 'FRIENDS':
        myFriends = set([str(id).strip() for id in allFriend(user.id)])
        if str(post['author']['id']).strip() in myFriends:
            return True
        else:
            return False
    if post.visibility == 'FOAF':
        myFriends = list(set([str(id).strip() for id in allFriend(user.id)]))
        data = {'query': 'friends', 'author': str(post['author']['id']).strip(), 'authors': myFriends}
        success, result = PostWithListOfFriends(data, post, post['author'])
        if not success:
            print('Failed to get FOAF info for author {0} with url {1}, reason: {2}'.format(str(post['author']['id']), post['author']['url'], result))
            return False
        if len(result['authors']) > 0:
            return True
        else:
            return False

    return True # should never reach here

def CanViewPost(post, user):
    if user.is_superuser:
        return True
    if post.author == user:
        return True

    if not user.is_anonymous() and IsRemoteAuthUser(user) and not post.privacy_host_only and post.privacy_level != 'me':
        return True # always allow for remote user

    if post.privacy_host_only and user.is_anonymous():
        return False
    if post.privacy_level == 'me' and user != post.author:
        return False
    if post.privacy_level == 'pub':
        return True
    if post.privacy_level == 'friends':
        if user.is_anonymous():
            return False
        return AreFriends(post.author, user)
    if post.privacy_level == 'fof':
        if user.is_anonymous():
            return False
        return AreFoaf(post.author, user)

    return False

class CreatePostPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous():
            return False
        else:
            return True

class PostPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        assert isinstance(obj, Post)

        if obj.author == request.user:
            return True
        if request.user.is_superuser:
            return True

        if request.method in permissions.SAFE_METHODS:
            return CanViewPost(obj, request.user)

        return False

class CreateCommentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return True

def CanViewComment(comment, user):
    assert isinstance(comment, Comment)
    return CanViewPost(comment.parent, user)

class CommentPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        assert isinstance(obj, Comment)

        if request.method in permissions.SAFE_METHODS:
            return CanViewComment(obj, request.user)
        if obj.local_author is not None and obj.local_author == request.user:
            return True
        if request.user.is_superuser:
            return True

        return False

class CreateImagePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            uploader = request.data.dict()['uploader']
        except:
            return True
        if uploader != '':
            if request.user.is_anonymous():
                return False
            pk = [x.strip() for x in uploader.split('/') if x.strip() != ''][-1] # bad hack
            requestedUser = Author.objects.get(pk=pk)
            if requestedUser is None:
                return False
            if request.user.id != requestedUser.id:
                return False
        return True

def CanViewImage(image, user):
    return CanViewPost(image.parent_post, user)

class ImagePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        assert isinstance(obj, Image)

        if request.method in permissions.SAFE_METHODS:
            return CanViewImage(obj, request.user)
        if obj.uploader == request.user:
            return True
        if request.user.is_superuser:
            return True

        return False
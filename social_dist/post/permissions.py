from rest_framework import permissions
from .models import Post, Image, Comment
from django.contrib.auth.models import AnonymousUser
from author.models import Author

def CanViewPost(post, user):
    if user.is_superuser:
        return True
    if post.author == user:
        return True

    if post.privacy_host_only and user.is_anonymous():
        return False
    if post.privacy_level == 'me' and user != post.author:
        return False
    if post.privacy_level == 'pub':
        return True
    if post.privacy_level == 'friends':
        pass # TODO
    if post.privacy_level == 'fof':
        pass # TODO

    return False

class CreatePostPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            author = request.data.dict()['author']
        except:
            return True
        if author != '':
            if request.user.is_anonymous():
                return False
            pk = [x.strip() for x in author.split('/') if x.strip() != ''][-1] # bad hack
            requestedUser = Author.objects.get(pk=pk)
            if requestedUser is None:
                return False
            if request.user.id != requestedUser.id:
                return False
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
        try:
            local_author = request.data.dict()['local_author']
        except:
            return True
        if local_author != '':
            if request.user.is_anonymous():
                return False
            pk = [x.strip() for x in local_author.split('/') if x.strip() != ''][-1] # bad hack
            requestedUser = Author.objects.get(pk=pk)
            if requestedUser is None:
                return False
            if request.user.id != requestedUser.id:
                return False
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

class ImagePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        assert isinstance(obj, Image)

        if request.method in permissions.SAFE_METHODS:
            return True
        if obj.uploader == request.user:
            return True
        if request.user.is_superuser:
            return True

        return False
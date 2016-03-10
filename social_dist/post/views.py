from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework import permissions
from rest_framework.renderers import JSONRenderer
from django.http import QueryDict
from rest_framework import mixins

from .models import Post, Image, Comment
from .serializers import *
from .permissions import *

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

class PostByAuthor(viewsets.ViewSet):
    """
    API endpoint that allows Posts to be viewed by author

    Usage: \n
      - GET /api/author/<author_id\>/posts
        - returns all visible posts made by the specified author
    """
    serializer_class = PostSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [PostPermission]

    def list(self, request, author_id):
        try:
            user = User.objects.get(pk = author_id)
        except:
            serializer = PostSerializer([], many=True, context={'request': request})
            return Response(serializer.data)
        queryset = Post.objects.all().order_by('-date_created').filter(author=user)
        queryset = [post for post in queryset if CanViewPost(post, request.user)]
        serializer = PostSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class MyPosts(PostByAuthor):
    """
    API endpoint for viewing Posts authored by current user

    Usage: \n
      - GET /api/author/myposts
    """
    def list(self, request):
        queryset = Post.objects.all().order_by('-date_created').filter(author=request.user)
        queryset = [post for post in queryset if CanViewPost(post, request.user)]
        serializer = PostSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Posts to be viewed, edited, and deleted

    Usage: \n
      - TODO

    Permissions: \n
      - any author can create a post
      - cannot impersonate another local user
      - poster/admin can edit/delete
    - list() produces only posts the client can view
    """
    queryset = Post.objects.all().order_by('-date_created')
    serializer_class = PostSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [PostPermission]

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreatePostPermission]
        return super(PostViewSet, self).get_permissions()

    def list(self, request):
        queryset = Post.objects.all().order_by('-date_created')
        queryset = [post for post in queryset if CanViewPost(post, request.user)]
        serializer = PostSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class CommentByPost(viewsets.ViewSet):
    """
    API endpoint that allows Comments to be listed/created (nested in /posts/)

    Usage: \n
      - GET /api/posts/<post_id\>/comments
      - POST /api/posts/<post_id\>/comments
    """
    serializer_class = CommentByPostSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [CommentPermission]

    def list(self, request, post_id):
        queryset = Comment.objects.all().order_by('-date_created')
        try:
            queryset = [comment for comment in queryset if comment.parent.id == Post.objects.get(pk=post_id).id]
        except:
            queryset = []
        queryset = [comment for comment in queryset if CanViewComment(comment, request.user)]
        serializer = CommentSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request, post_id):
        serializer = CommentByPostSerializer(data=request.data, context={'request': request, 'parent': post_id})
        # serializer.initial_data.parent = Post.objects.get(pk=post_id)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Comments to be created and viewed

    Usage: \n
      - TODO

    Permissions: \n
      - anyone can create a comment, even if not logged in
      - cannot impersonate another local user
      - admin can edit or delete
      - if comment is made by a local user, that user can edit or delete
    """
    queryset = Comment.objects.all().order_by('-date_created')
    serializer_class = CommentSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [CommentPermission]

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreateCommentPermission]
        return super(CommentViewSet, self).get_permissions()

    def list(self, request):
        queryset = Comment.objects.all().order_by('-date_created')
        queryset = [comment for comment in queryset if CanViewComment(comment, request.user)]
        serializer = CommentSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class ImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Images to be uploaded, viewed, and deleted

    Usage: \n
      - TODO

    Permissions: \n
      - any author can upload
      - uploader/admin can edit/delete
    """
    queryset = Image.objects.all().order_by('-date_created')
    serializer_class = ImageSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [ImagePermission]

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreateImagePermission]
        return super(ImageViewSet, self).get_permissions()

@login_required
def upload_image(request):
    context = {'user_id': request.user.id}
    return render(request, 'post/upload_image.html', context=context)

# @require_http_methods(['GET', 'POST'])
# def image_view(request, image_id):
#     if request.method == 'GET':
#         image = get_object_or_404(Image, pk=image_id)
#         print(type(image))
#         response = HttpResponse(image, mimetype="image/png")
#         return response
#     else:
#         return HttpResponse('not yet implemented')
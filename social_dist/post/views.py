from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework import permissions
from rest_framework.renderers import JSONRenderer
from django.http import QueryDict

from .models import Post, Image, Comment
from .serializers import PostSerializer, CommentSerializer, ImageSerializer
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
      - /api/post/posts/author/?username=username
      - /api/post/posts/author/?userid=pk
    """
    def list(self, request):
        if 'username' in request.query_params:
            user = User.objects.get(username = request.query_params['username'])
        elif 'userid' in request.query_params:
            user = User.objects.get(pk = request.query_params['userid'])
        else:
            serializer = PostSerializer([], many=True, context={'request': request})
            return Response(serializer.data)
        queryset = Post.objects.all().order_by('-date_created').filter(author=user)
        queryset = [post for post in queryset if CanViewPost(post, request.user)]
        serializer = PostSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class MyPosts(PostByAuthor):
    """
    API endpoint for viewing Posts authored by current user
    """
    def list(self, request):
        queryset = Post.objects.all().order_by('-date_created').filter(author=request.user)
        queryset = [post for post in queryset if CanViewPost(post, request.user)]
        serializer = PostSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Posts to be viewed or edited.

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

class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Comments to be viewed or edited.

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

    # def create(self, request, *args, **kwargs):
    #     local_author = request.data.dict()['local_author']
    #     if local_author != '':
    #         if request.user.is_anonymous():
    #             pass
    #         pk = [x.strip() for x in request.user.split('/') if x.strip() != ''][-1] # bad hack
    #         if request.user != Post.objects.get(pk):
    #             pass
    #     return super(CommentViewSet, self).create(request, *args, **kwargs)

class ImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Comments to be viewed or edited.

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

    # def retrieve(self, request, pk=None):
    #     queryset = Image.objects.all()
    #     image = get_object_or_404(queryset, pk=pk)
    #     serializer = ImageSerializer(image)
    #     return Response(serializer.data)

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
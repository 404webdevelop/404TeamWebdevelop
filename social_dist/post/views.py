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
from rest_framework.pagination import PageNumberPagination
from rest_framework import generics
from collections import OrderedDict
from author.models import Author

from .models import Post, Image, Comment
from .serializers import *
from .permissions import *

class PostPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('query', 'posts'),
            ('count', self.page.paginator.count),
            ('size', len(data)),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('posts', data)
        ]))

class CommentPagination(PostPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('query', 'comments'),
            ('count', self.page.paginator.count),
            ('size', len(data)),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('comments', data)
        ]))

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders its content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

class PagedViewMixin(object):
    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

class PostByAuthor(viewsets.ViewSet, PagedViewMixin):
    """
    API endpoint that allows Posts to be viewed by author

    Usage: \n
      - GET /api/author/<author_id\>/posts
        - returns all visible posts made by the specified author
    """
    serializer_class = PostWriteSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [PostPermission]
    pagination_class = PostPagination

    def list(self, request, author_id):
        try:
            user = Author.objects.get(pk = author_id)
        except:
            serializer = PostReadSerializer([], many=True, context={'request': request})
            return Response(serializer.data)
        queryset = Post.objects.all().order_by('-date_created').filter(author=user)
        queryset = [post for post in queryset if CanViewPost(post, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PostReadSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = PostReadSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class MyPosts(PostByAuthor):
    """
    API endpoint for viewing Posts authored by current user

    Usage: \n
      - GET /api/author/myposts
    """
    permission_classes = [permissions.IsAuthenticated, PostPermission]

    def list(self, request):
        queryset = Post.objects.all().order_by('-date_created').filter(author=request.user)
        queryset = [post for post in queryset if CanViewPost(post, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PostReadSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = PostReadSerializer(queryset, many=True, context={'request': request})
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
    serializer_class = PostWriteSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [PostPermission]
    pagination_class = PostPagination

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreatePostPermission]
        return super(PostViewSet, self).get_permissions()

    def create(self, request, *args, **kwargs):
        author = Author.objects.get(request.user)
        request.data['author'] = author.id
        return super(PostViewSet, self).create(request, *args, **kwargs)


    def list(self, request):
        queryset = Post.objects.all().order_by('-date_created')
        queryset = [post for post in queryset if CanViewPost(post, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PostReadSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = PostReadSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class CommentByPost(viewsets.ViewSet, PagedViewMixin):
    """
    API endpoint that allows Comments to be listed/created (nested in /posts/)

    Usage: \n
      - GET /api/posts/<post_id\>/comments
      - POST /api/posts/<post_id\>/comments
    """
    serializer_class = CommentByPostSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [CommentPermission]
    pagination_class = CommentPagination

    def list(self, request, post_id):
        queryset = Comment.objects.all().order_by('-date_created')
        try:
            queryset = [comment for comment in queryset if comment.parent.id == Post.objects.get(pk=post_id).id]
        except:
            queryset = []
        queryset = [comment for comment in queryset if CanViewComment(comment, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CommentReadSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = CommentReadSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def create(self, request, post_id):
        serializer = CommentByPostSerializer(data=request.data, context={'request': request, 'parent': post_id})
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
    serializer_class = CommentWriteSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [CommentPermission]
    pagination_class = CommentPagination

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreateCommentPermission]
        return super(CommentViewSet, self).get_permissions()

    def list(self, request):
        queryset = Comment.objects.all().order_by('-date_created')
        queryset = [comment for comment in queryset if CanViewComment(comment, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = CommentReadSerializer(queryset, many=True, context={'request': request})
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
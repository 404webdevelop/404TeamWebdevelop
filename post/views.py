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
from rest_framework import exceptions
from rest_framework.views import APIView
from .models import Post, Image, Comment
from follower.views import allFriend
from .serializers import *
from .permissions import *
from remotes.utils import *
from django.http import Http404

class PostPagination(PageNumberPagination):
    page_size = 50
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

class ImagePagination(PostPagination):
    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('query', 'images'),
            ('count', self.page.paginator.count),
            ('size', len(data)),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('images', data)
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
      - `/author/{author_id}/posts`
        - GET: list all posts created by one author
        - you cannot POST to this url
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
        queryset = Post.objects.all().order_by('-published').filter(author=user)
        queryset = [post for post in queryset if CanViewPost(post, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PostReadSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = PostReadSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class RemotePostsViewSet(viewsets.ViewSet, PagedViewMixin):
    """
    This is a set of remote posts (by one remote author)

    Usage: \n
      - GET to list
      - (POST is not allowed)
    """
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    pagination_class = PostPagination

    def list(self, request, remote_url):
        remotePostsDicts = GetRemotePostsAtUrl(remote_url, requestingUser = request.user)
        if remotePostsDicts is not None:

            remotePostsDicts = [post for post in remotePostsDicts if CanViewRemotePost(post, request.user, RemotePostSerializer(post, context={'request': request}))]

            page = self.paginate_queryset(remotePostsDicts)
            if page is not None:
                data = SerializePosts(page, request)
                return self.get_paginated_response(data)

            return Response({'Error': 'Failed to paginate'}, status=500)
        else:
            return Response({'Error': 'Could not fetch url'}, status=404)

class RemoteCommentByPost(viewsets.ViewSet, PagedViewMixin):
    """
    This is a set of remote comments

    Usage: \n
      - GET to list
      - POST to create a remote comment
    """
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    pagination_class = CommentPagination
    serializer_class = RemoteCommentByPostSerializer

    def list(self, request, remote_url):
        """
        List remote comments by URL of their remote parent post
        """
        remoteCommentDicts = GetRemoteCommentsAtUrl(remote_url, requestingUser = request.user)
        if remoteCommentDicts is not None:
            page = self.paginate_queryset(remoteCommentDicts)
            if page is not None:
                serializer = RemoteCommentSerializer(page, many=True, context={'request': request})
                return self.get_paginated_response(serializer.data)

            return Response({'Error': 'Failed to paginate'}, status=500)
        else:
            return Response({'Error': 'Could not fetch url'}, status=404)

    def create(self, request, remote_url):
        """
        Post a remote comment by URL of its remote parent post
        """
        data = request.data
        result = PostRemoteCommentAtUrl(remote_url, data, request, request.user)
        if result == True:
            return Response({'Result': 'Maybe posted your comment'})
        elif isinstance(result, dict):
            return Response(result, status=500)
        else:
            return Response({'Error': result}, status=500)

class MyPosts(PostByAuthor):
    """
    API endpoint for viewing Posts authored by current user

    Usage: \n
      - `/api/author/myposts`
        - GET: list all posts by current logged-in author (paginated)
        - you cannot post to this url
    """
    permission_classes = [permissions.IsAuthenticated, PostPermission]

    def list(self, request):
        queryset = Post.objects.all().order_by('-published').filter(author=request.user)
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
      - `/posts/{post_id}`
        - GET: get JSON for one post
      - `/posts`
        - POST: create a new post
        - GET: list all posts (paginated)

    Usage (posts by author) \n
      - `/author/{author_id}/posts`
        - GET: list all posts created by one author
        - you cannot POST to this url

    Permissions: \n
      - Any author can create a post (must be logged in)
      - The post's author (or any admin) can edit/delete

    Creation fields: \n
      - `title`: post title
      - `content`: post content
      - `privacy_level`: who can view the post?
        - "pub": Public
        - "me": Private to me
        - "friends": Friends only
        - "fof": Friends of friends
    """
    queryset = Post.objects.all().order_by('-published')
    serializer_class = PostWriteSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [PostPermission]
    pagination_class = PostPagination

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreatePostPermission]
        return super(PostViewSet, self).get_permissions()

    def list(self, request):
        queryset = Post.objects.all().order_by('-published')
        queryset = [post for post in queryset if CanViewPost(post, request.user)]

        if request.user.is_anonymous() or (not IsRemoteAuthUser(request.user)):
            queryset += [remotePost for remotePost in GetAllRemotePosts() if CanViewRemotePost(remotePost, request.user, RemotePostSerializer(remotePost, context={'request': request}))]

        queryset.sort(key = lambda x: x.published, reverse=True)

        page = self.paginate_queryset(queryset) # just truncates?
        if page is not None:
            data = SerializePosts(page, request)
            return self.get_paginated_response(data)

        data = SerializePosts(queryset, request)
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except:
            pass

        if not (request.user.is_anonymous() or (not IsRemoteAuthUser(request.user))):
            raise Http404

        queryset = GetAllRemotePosts()
        posts = SerializePosts(queryset, request)
        # lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field
        posts = [post for post in posts if post['id'] == kwargs['pk']]
        if len(posts) < 1:
            raise Http404

        return Response(posts[0])

class CommentByPost(viewsets.ViewSet, PagedViewMixin):
    """
API endpoint that allows Comments to be listed/created by their parent post

Usage: \n
  - `/posts/{post_id}/comments`
    - GET: list all comments for one post
    - POST: create a new comment (no need to specify parent post)

Permissions: \n
  - Anyone can create a comment, even if not logged in
  - Admin can edit/delete
  - If comment is made by a local user, that user can edit/delete
  - Remote commenters cannot edit/delete

##**How to create a comment:** \n
\t{
    \t"comment": "words words words",
    \t"contentType": "text/plain",
    \t"author":
    \t{
    \t\t"id": "For local comments, leave all the stuff in author blank!",
    \t\t"host": "For remote comments, fill all of it in.",
    \t\t"displayName": "",
    \t\t"url": "",
    \t\t"github": ""
    \t}
\t}
    """
    serializer_class = CommentByPostSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [CommentPermission]
    pagination_class = CommentPagination

    def list(self, request, post_id):
        queryset = Comment.objects.all().order_by('-published')
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
    API endpoint that allows Comments to be listed/created

    Usage: \n
      - `/comments/{comment_id}`
        - GET: get JSON for one comment
      - `/comments`
        - GET: list all comments (paginated)
        - Don't POST here

    Usage (comments by parent post): \n
      - `/posts/{post_id}/comments`
        - GET: list all comments for one post
        - POST: create a new comment (no need to specify parent post)

    Permissions: \n
      - Anyone can create a comment, even if not logged in
      - Admin can edit/delete
      - If comment is made by a local user, that user can edit/delete
      - Remote commenters cannot edit/delete

    Creation fields: \n
      - `content`: text content of the comment
      - `remote_author_name`: display name of remote comment author (optional)
      - `remote_author_url`: url of remote comment author (optional)
      - `parent`: url of parent post
    """
    queryset = Comment.objects.all().order_by('-published')
    serializer_class = CommentWriteSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [CommentPermission]
    pagination_class = CommentPagination

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreateCommentPermission]
        return super(CommentViewSet, self).get_permissions()

    def list(self, request):
        queryset = Comment.objects.all().order_by('-published')
        queryset = [comment for comment in queryset if CanViewComment(comment, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer =CommentReadSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = CommentReadSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class ImageViewSet(viewsets.ModelViewSet, PagedViewMixin):
    """
    API endpoint that allows Images to be uploaded, viewed, and deleted

    Usage: \n
      - `/images`
        - GET: list all images (currently non-paginated, which may change)
        - POST: create a new image
      - `/images/{image_id}`
        - GET: fetch the image (as an image)
      -  `/images/{image_id}/?json`
        - GET: fetch the image details as JSON


    Permissions: \n
      - Any author can upload
      - Uploader/admin can edit/delete
      - Each image is associated with one post
        - Only users who can view the post can view the image

    Creation fields: \n
      - `parent_post`: url of parent post
      - `file_type`: {'jpeg', 'png', 'gif', 'bmp'}
      - `image_data`: the image being uploaded
    """
    queryset = Image.objects.all().order_by('-published')
    serializer_class = ImageCreateSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [ImagePermission]
    pagination_class = ImagePagination

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [CreateImagePermission]
        return super(ImageViewSet, self).get_permissions()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        queryset = [image for image in queryset if CanViewImage(image, request.user)]

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ImageSimpleSerializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = ImageSimpleSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not CanViewImage(instance, request.user):
            raise exceptions.PermissionDenied('You cannot view this image')
        if 'json' in request.query_params:
            serializer = ImageSerializer(instance, context={'request': request})
            return Response(serializer.data)
        else:
            imageModel = instance
            content_type = imageModel.file_type
            return HttpResponse(imageModel.image_data, content_type=content_type)

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


class FOAFPostView(APIView):
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]

    def post(self, request):
        if not IsRemoteAuthUser(request.user):
            return Response({
                'is_foaf': False,
                'error': 'need to be a remote user to call this API'
            })

        post_id = request.data['id']
        viewer = request.data['author']
        friends = request.data['friends']

        post = Post.objects.get(pk=post_id)
        if post is None:
            return Response({
                'is_foaf': False,
                'message': 'post not exist'
            })
        author = post.author
        author_friends = allFriend(author.id)

        if viewer['id'] in author_friends:
            return Response({
                'is_foaf': False,
                'error': 'they are friend'
            })

        comm = list(set(friends) & set(author_friends))
        # TODO: remote check
        if len(comm) is not 0:
            serializer = PostReadSerializer(post, context={'request': request})
            return Response({
                'is_foaf': True,
                'post': serializer.data
            })
        else:
            return Response({
                'is_foaf': False,
                'post': None
            })

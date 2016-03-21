from django.http import HttpResponse
from django.core.servers.basehttp import FileWrapper
from collections import OrderedDict

from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination

from permissions import IsAdminOrSelfOrReadOnly
from serializers import UserSerializer, SerializeAuthors, RemoteAuthorSerializer
from author.models import Author

from remotes.utils import *

class AuthorPagination(PageNumberPagination):
    page_size = 50
    page_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('query', 'author'),
            ('count', self.page.paginator.count),
            ('size', len(data)),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('authors', data)
        ]))


# for rest framework
class AuthorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Authors to be created, viewed, and edited

    Usage: \n
      - /authors/
        - GET: return a list of active authors
        - POST: create an author
      - /authors/{uuid}/
        - GET: return a single author with uuid
        - PUT, PATCH (authorized): update an author
      - /authors/me/
        - GET (authorized): return logged in user

    Fields:\n
      - username (required): unique
      - password (required)
      - email (required)
      - *first_name
      - *last_name
      - *github: github account, i.e https://github.com/ironman where github account should be ironman
      - *picture

    """
    queryset = Author.objects.all().filter(is_superuser=False).filter(is_active=True).order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAdminOrSelfOrReadOnly, ]
    pagination_class = AuthorPagination

    def list(self, request):
        queryset = Author.objects.all().filter(is_superuser=False).filter(is_active=True).order_by('-date_joined')
        queryset = list(queryset)

        if request.user.is_anonymous() or (not IsRemoteAuthUser(request.user)):
            queryset += GetAllRemoteAuthors()

        page = self.paginate_queryset(queryset)
        if page is not None:
            data = SerializeAuthors(page, request)
            return self.get_paginated_response(data)

        data = SerializeAuthors(queryset, request)
        return Response(data)

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [AllowAny, ]
        if self.action == 'me':
            self.permission_classes = [AllowAny,]
        return super(AuthorViewSet, self).get_permissions()

    def create(self, request, *args, **kwargs):
        return super(AuthorViewSet, self).create(request, args, kwargs)

    @detail_route(methods=["GET", "POST"])
    def profile_picture(self, request, **kwargs):
        if request.method == "GET":
            user = Author.objects.get(id=kwargs['pk'])
            response = HttpResponse(FileWrapper(user.picture), content_type='image')
            return response
        else:
            username = request.data.pop('user')[0]
            user = Author.objects.get_by_natural_key(username)
            uploaded_file = request.data.pop('0')[0]
            user.picture.save(uploaded_file.name, uploaded_file)
            image_url = 'api/authors/%d/profile_picture/' % user.id
            return Response({'url': image_url})

    @detail_route(methods=['POST'])
    def change_password(self, request, **kwargs):
        user = request.user
        data = request.data
        if data.get('password', None):
            password = data.get('password', None)
            user.set_password(password)
            user.save()
        serializer = UserSerializer(user, context={'request': request})
        return Response(serializer.data)

    @list_route(methods=['GET', 'POST'])
    def me(self, request, **kwargs):
        if request.user.is_anonymous():
            return Response({
                "message": "No user logged in"
            })
        if request.method == 'GET':
            serializer = UserSerializer(request.user, context={'request': request})
            return Response(serializer.data)
        else:
            return super(AuthorViewSet, self).update(request, **kwargs)

class RemoteAuthorViewSet(viewsets.ViewSet):
    """
    This is a remote author's profile
    """
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]

    def list(self, request, remote_url):
        remoteAuthorDict = GetOneRemoteAuthor(remote_url)
        if remoteAuthorDict is not None:
            serializer = RemoteAuthorSerializer(remoteAuthorDict, context={'request': request})
            return Response(serializer.data)
        else:
            return Response({'Error': 'Could not fetch url'}, status=404)
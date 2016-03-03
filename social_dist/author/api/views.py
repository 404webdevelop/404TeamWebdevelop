from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny
from permissions import IsAdminOrSelfOrReadOnly
from rest_framework.response import Response
from serializers import AuthorSerializer, AuthorShortSerializer


# for rest framework
class AuthorViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().filter(is_superuser=False).order_by('-date_joined')
    serializer_class = AuthorSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAdminOrSelfOrReadOnly, ]

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [AllowAny, ]
        return super(AuthorViewSet, self).get_permissions()

    def list(self, request):
        queryset = User.objects.all().filter(is_superuser=False).order_by('-date_joined')
        serializer = AuthorShortSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route()
    def method_name(self):
        pass

    @detail_route()
    def change_password(self):
        pass
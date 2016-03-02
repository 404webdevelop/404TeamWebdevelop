from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from rest_framework.authentication import BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from serializers import AuthorSerializer, AuthorShortSerializer, AuthorProfileSerializer

from django.contrib.auth.models import User


# for rest framework
class AuthorViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().filter(is_superuser=False).order_by('-date_joined')
    serializer_class = AuthorSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated, ]

    def get_permissions(self):
        if self.action == 'list':
            self.permission_classes = [AllowAny, ]
        elif self.action == 'create':
            self.permission_classes = [AllowAny, ]
        elif self.action == 'update':
            self.permission_classes = [IsAuthenticated, ]
        elif self.action == 'retrieve':
            self.permission_classes = [IsAuthenticated, ]
        elif self.action == 'profile':
            self.permission_classes = [AllowAny, ]
        else:
            self.permission_classes = [IsAuthenticated, ]
        return super(AuthorViewSet, self).get_permissions()

    def list(self, request):
        serializer = AuthorShortSerializer(self.queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route()
    def profile(self, request, *args, **kwargs):
        me = self.get_object()
        serializer = AuthorProfileSerializer(me, context={'request': request})
        return Response(serializer.data)


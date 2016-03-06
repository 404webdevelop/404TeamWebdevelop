from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authentication import BasicAuthentication, TokenAuthentication, SessionAuthentication
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.models import Token
from permissions import IsAdminOrSelfOrReadOnly
from rest_framework.response import Response
from serializers import UserSerializer


# for rest framework
class AuthorViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().filter(is_superuser=False).order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAdminOrSelfOrReadOnly, ]

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [AllowAny, ]
        if self.action == 'me':
            self.permission_classes = [AllowAny,]
        return super(AuthorViewSet, self).get_permissions()

    def create(self, request, *args, **kwargs):
        print request.data
        return super(AuthorViewSet, self).create(request, *args, **kwargs)

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

    @list_route(methods=['POST'])
    def me(self, request, **kwargs):
        token_serializer = AuthTokenSerializer(data=request.data)
        token_serializer.is_valid(raise_exception=True)
        user = token_serializer.validated_data['user']
        user_serializer = UserSerializer(user, context={'request': request})
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': user_serializer.data,
            'token': token.key
        })



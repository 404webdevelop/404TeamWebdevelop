from django.http import HttpResponse
from django.views.decorators.http import require_http_methods, require_GET
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth.decorators import login_required
from utils.http import HttpResponseUnauthorized

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from serializers import UserSerializer, AuthorSerializer, AuthorProfileSerializer

from django.contrib.auth.models import User
from post.models import get_post_for_author

from . import models


# for rest framework
class AuthorViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    authentication_classes = [BasicAuthentication, TokenAuthentication]

    def get_permissions(self):
        if self.action == 'profile' or self.action == 'list':
            self.permission_classes = [AllowAny, ]
        else:
            self.permission_classes = [IsAuthenticated, ]
        return super(AuthorViewSet, self).get_permissions()

    def list(self, request):
        queryset = User.objects.all().order_by('-date_joined')
        serializer = AuthorSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route()
    def profile(self, request, *args, **kwargs):
        me = self.get_object()
        serializer = AuthorProfileSerializer(me, context={'request': request})
        return Response(serializer.data)



@require_http_methods(['GET', 'POST'])
def signup_view(request):
    if request.method == 'GET':
        return HttpResponse(render(request, 'author/signup.html'))
    elif request.method == 'POST':
        user = models.signup(request)
        return redirect('/author')


@require_http_methods(['GET', 'POST'])
def login_view(request):
    if request.method == 'GET':
        return redirect('author')
    elif request.method == 'POST':
        user = models.login(request)
        if user is None:
            return HttpResponseUnauthorized("Unauthorized")
        if not user.is_active:
            return HttpResponse('login success, but user is not active')
        return redirect('/author/profile')
        

@require_GET
@login_required
def home_view(request):
    posts = get_post_for_author(request.user)
    return render(request, 'author/index.html', {
            'user': request.user,
            'posts': posts
        })


@require_GET
def public_profile(request, author_id):
    author = get_object_or_404(User, id=author_id)
    return render(request, 'author/profile.html', {
        'author': author,
        'github_username': 'wyushi'
    })


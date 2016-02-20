from django.http import HttpResponse
from django.views.decorators.http import require_http_methods, require_GET
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib.auth.decorators import login_required
from utils.http import HttpResponseUnauthorized

from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from serializers import UserSerializer
from post.models import Post

from . import models


# for rest framework
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


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
    posts = Post.objects.all()
    return render(request, 'author/index.html', {
            'user': request.user,
            'posts': posts
        })

@require_GET
def public_profile(request, author_id):
    author = get_object_or_404(User, id=author_id)
    return render(request, 'author/profile.html', {
        'author': author
    })


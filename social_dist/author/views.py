from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods, require_GET, require_POST
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.template import loader

from . import models



@require_http_methods(['GET', 'POST'])
def signup_view(request):
    if request.method == 'GET':
        return HttpResponse(render(request, 'author/signup.html'))
    elif request.method == 'POST':
        user = models.signup(request)
        return redirect('auther')


@require_http_methods(['GET', 'POST'])
def login_view(request):
    if request.method == 'GET':
        return redirect('author')
    elif request.method == 'POST':
        user =  models.login(request)
        if user is not None:
            if user.is_active:
                return redirect('/author/profile')
            return HttpResponse('login success, but user is not active')
        res = HttpResponse("Unauthrized")
        res.status_code = 401
        return res


@require_GET
@login_required(login_url="author")
def profile_view(request):
    return render(request, 'author/profile.html', {
            'user': request.user
        })


@require_GET
def logout(request):
    models.logout(request)
    return redirect('/author')        

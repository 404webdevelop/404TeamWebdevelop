from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods, require_GET, require_POST
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.template import loader
import django.contrib.auth as auth



@require_http_methods(['GET', 'POST'])
def signup_view(request):
    if request.method == 'GET':
        return HttpResponse(render(request, 'author/signup.html'))
    elif request.method == 'POST':
        return signup(request)


@require_POST
def signup(request):
    username = request.POST['username']
    email = request.POST['email']
    password = request.POST['password']
    user = User.objects.create_user(username, email, password)
    user.is_active = False
    user.save()
    return redirect('/author')


@require_http_methods(['GET', 'POST'])
def login_view(request):
    if request.method == 'GET':
        return redirect('/author')
    elif request.method == 'POST':
        return login(request)


@require_POST
def login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = auth.authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            auth.login(request, user)
            return redirect('/author/profile')
        else:
            return HttpResponse('login success, but user is not active')
    else:
        # TODO: make a class for this
        res = HttpResponse("Unauthorized")
        res.status_code = 401
        return res


@require_GET
@login_required(login_url="/author")
def profile_view(request):
    return render(request, 'author/profile.html', {
            'user': request.user
        })


@require_GET
def logout(request):
    auth.logout(request)
    return redirect('/author')        

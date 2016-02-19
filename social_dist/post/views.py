from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets
from django.views.decorators.http import require_http_methods

from .models import Post, Image, Comment
from .serializers import PostSerializer, CommentSerializer

class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Posts to be viewed or edited.
    """
    queryset = Post.objects.all().order_by('-date_created')
    serializer_class = PostSerializer

class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Comments to be viewed or edited.
    """
    queryset = Comment.objects.all().order_by('-date_created')
    serializer_class = CommentSerializer

@require_http_methods(['GET', 'POST'])
def image_view(request, image_id):
    if request.method == 'GET':
        image = get_object_or_404(Image, pk=image_id)
        print(type(image))
        response = HttpResponse(image, mimetype="image/png")
        return response
    else:
        return HttpResponse('not yet implemented')
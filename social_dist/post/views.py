from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required

from .models import Post, Image, Comment
from .serializers import PostSerializer, CommentSerializer, ImageSerializer
from rest_framework.views import APIView

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

class ImageViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Comments to be viewed or edited.
    """
    queryset = Image.objects.all().order_by('-date_created')
    serializer_class = ImageSerializer

    # def retrieve(self, request, pk=None):
    #     queryset = Image.objects.all()
    #     image = get_object_or_404(queryset, pk=pk)
    #     serializer = ImageSerializer(image)
    #     return Response(serializer.data)

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
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.views.decorators.http import require_http_methods

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

    parser_classes = (MultiPartParser, FormParser)

    # def retrieve(self, request, pk=None):
    #     queryset = Image.objects.all()
    #     image = get_object_or_404(queryset, pk=pk)
    #     serializer = ImageSerializer(image)
    #     return Response(serializer.data)

    # def get(self, request, pk, format=None):
    #     image = get_object_or_404(Image, pk=pk)
    #     serializer = ImageSerializer(image)
    #     return Response(data=serializer.data)
    #
    # def post(self, request, format=None):
    #     fileData = request.FILES['file']
    #     serializer = ImageSerializer(fileData)
    #     if serializer.is_valid():
    #         serializer.save()
    #     return Response('Uploaded', status.HTTP_201_CREATED)

# @require_http_methods(['GET', 'POST'])
# def image_view(request, image_id):
#     if request.method == 'GET':
#         image = get_object_or_404(Image, pk=image_id)
#         print(type(image))
#         response = HttpResponse(image, mimetype="image/png")
#         return response
#     else:
#         return HttpResponse('not yet implemented')
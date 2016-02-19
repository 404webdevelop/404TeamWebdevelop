from rest_framework import serializers

from .models import Post, Image, Comment

from author.serializers import UserSerializer

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        author = UserSerializer()
        fields = ('title', 'content', 'author', 'date_created', 'last_modified', 'privacy_level', 'privacy_host_only')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('content', 'author_id', 'author_origin', 'parent', 'date_created', 'last_modified')
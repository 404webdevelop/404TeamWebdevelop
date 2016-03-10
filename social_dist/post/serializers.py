import base64
import imghdr
from rest_framework import serializers

from .models import Post, Image, Comment

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('url', 'title', 'content', 'author', 'date_created', 'last_modified', 'privacy_level', 'privacy_host_only')

    def to_representation(self, obj):
        data = super(PostSerializer, self).to_representation(obj)
        data['comments'] = data['url'] + 'comments/'
        data['username'] = obj.author.username
        return data

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('url', 'content', 'local_author', 'remote_author_name', 'remote_author_url', 'parent', 'date_created', 'last_modified')

class CommentByPostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('url', 'content', 'local_author', 'remote_author_name', 'remote_author_url', 'date_created', 'last_modified')

    def create(self, validated_data):
        post_id = self.context['parent']
        validated_data['parent'] = Post.objects.get(pk=post_id)
        comment = Comment.objects.create(**validated_data)
        return comment

# http://www.scriptscoop.net/t/7d698c5fe6de/using-django-rest-framework-how-can-i-upload-a-file-and-send-a-json-pa.html
class Base64Field(serializers.Field):
    def to_internal_value(self, data):
        # Check if the base64 string is in the "data:" format
        if 'data:' in data and ';base64,' in data:
            # Break out the header from the base64 content
            header, data = data.split(';base64,')

        # Try to decode the file. Return validation error if it fails.
        try:
            decoded_file = base64.b64decode(data)
        except TypeError:
            self.fail('invalid_image')

        file_ext = imghdr.what('', decoded_file)
        if file_ext == 'jpg':
            file_ext = 'jpeg'

        return decoded_file

    def to_representation(self, value):
        return base64.b64encode(value)

class ImageSerializer(serializers.HyperlinkedModelSerializer):
    image_data = Base64Field()
    class Meta:
        model = Image
        fields = ('url', 'uploader', 'file_type', 'image_data', 'date_created')

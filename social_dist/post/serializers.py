import base64
import imghdr
from rest_framework import serializers

from .models import Post, Image, Comment

class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('title', 'content', 'author', 'date_created', 'last_modified', 'privacy_level', 'privacy_host_only')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('content', 'author_id', 'author_origin', 'parent', 'date_created', 'last_modified')

# http://www.scriptscoop.net/t/7d698c5fe6de/using-django-rest-framework-how-can-i-upload-a-file-and-send-a-json-pa.html
class Base64Field(serializers.Field):
    def to_internal_value(self, data):
        # Check if this is a base64 string
        if isinstance(data, str):
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
        else:
            self.fail('not a string')

    def to_representation(self, value):
        return base64.b64encode(value)

class ImageSerializer(serializers.HyperlinkedModelSerializer):
    image_data = Base64Field()
    class Meta:
        model = Image
        fields = ('uploader', 'file_type', 'image_data', 'date_created')
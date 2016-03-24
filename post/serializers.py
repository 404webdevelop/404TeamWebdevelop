import base64
import imghdr
from urlparse import urlparse
from rest_framework import serializers
from permissions import *
from rest_framework import exceptions
import collections
import json
from django.core.urlresolvers import reverse

from author.api.serializers import UserSerializer
from .models import Post, Image, Comment
from remotes.models import *
from remotes.utils import *

class PostWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'url', 'title', 'content', 'contentType', 'published', 'privacy_level', 'privacy_host_only')

    def create(self, validated_data):
        author = self.context['request'].user
        validated_data['author'] = author
        post = Post.objects.create(**validated_data)
        return post

    def to_representation(self, obj):
        data = super(PostWriteSerializer, self).to_representation(obj)

        request = self.context['request']
        queryset = Comment.objects.all().order_by('-published')
        try:
            queryset = [comment for comment in queryset if comment.parent.id == obj.id]
        except:
            queryset = []
        queryset = [comment for comment in queryset if CanViewComment(comment, request.user)]
        commentSerializer = CommentReadSerializer(data = queryset, many = True, context = {'request': request})
        commentSerializer.is_valid()
        data['comments'] = commentSerializer.data

        data['comments_list'] = data['url'] + 'comments/'

        data['username'] = obj.author.username
        data['source'] = data['url']
        data['origin'] = data['url']
        return data

class PostReadSerializer(PostWriteSerializer):
    author = UserSerializer()

    class Meta:
        model = Post
        fields = ('id', 'url', 'title', 'content', 'author', 'contentType', 'published', 'privacy_level', 'privacy_host_only')

    def to_representation(self, obj):
        data = super(PostReadSerializer, self).to_representation(obj)
        data['description'] = ''
        data['categories'] = []
        data['count'] = len(data['comments'])
        data['size'] = len(data['comments'])

        # visibility: PUBLIC FOAF FRIENDS PRIVATE SERVERONLY
        if data['privacy_host_only']:
            data['visibility'] = 'SERVERONLY'
        elif data['privacy_level'] == 'pub':
            data['visibility'] = 'PUBLIC'
        elif data['privacy_level'] == 'me':
            data['visibility'] = 'PRIVATE'
        elif data['privacy_level'] == 'fof':
            data['visibility'] = 'FOAF'
        elif data['privacy_level'] == 'friends':
            data['visibility'] = 'FRIENDS'

        return data

class RemoteCommentSerializer(serializers.Serializer):
    data = serializers.CharField(max_length=None)
    published = serializers.DateTimeField()

    def to_representation(self, obj):
        request = self.context['request']
        data = super(RemoteCommentSerializer, self).to_representation(obj)
        jsonDict = json.loads(data['data'])
        for key in jsonDict:
            data[key] = jsonDict[key]
        del data['data']
        return data

class RemotePostSerializer(serializers.Serializer):
    data = serializers.CharField(max_length=None)
    published = serializers.DateTimeField()

    def to_representation(self, obj):
        request = self.context['request']
        data = super(RemotePostSerializer, self).to_representation(obj)
        jsonDict = json.loads(data['data'])
        for key in jsonDict:
            data[key] = jsonDict[key]
        del data['data']
        if 'url' not in data and 'origin' in data:
            data['url'] = data['origin']
        if 'url' not in data and 'source' in data:
            data['url'] = data['source']
        if 'username' not in data and 'author' in data:
            if 'username' in data['author']:
                data['username'] = data['author']['username']
            if 'displayName' in data['author']:
                data['username'] = data['author']['displayName']

        # comments proxy
        commentsURL = None
        if 'url' in data and not IsLocalURL(data['url'], request) and ContainsARemoteHostname(data['url']):
            if data['url'][-1] == '/':
                commentsURL = data['url'] + 'comments/'
            else:
                commentsURL = data['url'] + 'comments'
        elif 'origin' in data and not IsLocalURL(data['origin'], request) and ContainsARemoteHostname(data['origin']):
            if data['origin'][-1] == '/':
                commentsURL = data['origin'] + 'comments/'
            else:
                commentsURL = data['origin'] + 'comments'
        elif 'author' in data and 'host' in data['author'] and ContainsARemoteHostname(data['author']['host']) and 'id' in data:
            host = data['author']['host']
            host = GetRemoteHostContaining(host)
            commentsURL = host + '/posts/' + data['id'] + '/comments'

        if commentsURL is not None:
            data['comments_list'] = request.build_absolute_uri(reverse('remote_comment_by_post-list', args=(commentsURL,)))

        return data

def SerializePosts(posts, request):
    results = []
    for post in posts:
        if isinstance(post, Post):
            serializer = PostReadSerializer(post, context={'request': request})
            results.append(serializer.data)
        elif isinstance(post, RemotePost):
            serializer = RemotePostSerializer(post, context={'request': request})
            results.append(serializer.data)
        else:
            raise Exception()
    return results

# class RemotePostSerializer(serializers.Serializer):
#     def to_representation(self, obj):
#         if isinstance(obj, Post):
#             serializer = PostReadSerializer(obj, many=True, context={'request': self.context['request']})
#             return serializer.data
#         elif isinstance(obj, RemotePost):
#             # d = (('published', obj.published), ('data', obj.data))
#             d = (('a', 1),('b', 2))
#             return collections.OrderedDict(d)
#         else:
#             raise Exception()

class CommentWriteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('url', 'content', 'remote_author_name', 'remote_author_url', 'parent', 'contentType', 'published')

    def create(self, validated_data):
        local_author = self.context['request'].user
        if not local_author.is_anonymous() and not IsRemoteAuthUser(local_author):
            validated_data['local_author'] = local_author
        comment = Comment.objects.create(**validated_data)
        return comment

    def validate_parent(self, value):
        if not CanViewPost(value, self.context['request'].user):
            raise exceptions.PermissionDenied('Attempted to create Comment with parent you cannot view')
        return value

    def to_representation(self, obj):
        data = super(CommentWriteSerializer, self).to_representation(obj)
        data['comment'] = data['content']
        data['pubDate'] = data['published']
        if 'local_author' in data and data['local_author'] is not None:
            data['author'] = data['local_author']
        elif data['remote_author_name'] != '':
            data['author'] = {'username': data['remote_author_name'], 'displayName': data['remote_author_name']}
            if data['remote_author_url'] != '':
                data['author']['url'] = data['remote_author_url']
                parsedURL = urlparse(data['remote_author_url'])
                data['author']['host'] = parsedURL.netloc
            data['author']['github'] = ''
        elif obj.local_author is not None:
            serializer = UserSerializer(obj.local_author, context={'request': self.context['request']})
            data['author']  = serializer.data
            data['local_author'] = serializer.data
        else:
            data['author'] = {'ERROR': 'This comment has neither a local nor remote author', 'username': ''
                              , 'displayName': '', 'url': '', 'host': '', 'github': ''}
        return data

class CommentReadSerializer(CommentWriteSerializer):
    local_author = UserSerializer()
    class Meta:
        model = Comment
        fields = ('url', 'content', 'local_author', 'remote_author_name', 'remote_author_url', 'parent', 'contentType', 'published')

    def to_representation(self, obj):
        data = super(CommentReadSerializer, self).to_representation(obj)
        data['comment'] = data['content']
        data['pubDate'] = data['published']
        if 'local_author' in data and data['local_author'] is not None:
            data['author'] = data['local_author']
        elif data['remote_author_name'] != '':
            data['author'] = {'username': data['remote_author_name'], 'displayName': data['remote_author_name']}
            if data['remote_author_url'] != '':
                data['author']['url'] = data['remote_author_url']
                parsedURL = urlparse(data['remote_author_url'])
                data['author']['host'] = parsedURL.netloc
            data['author']['github'] = ''
        else:
            data['author'] = {'ERROR': 'This comment has neither a local nor remote author', 'username': ''
                              , 'displayName': '', 'url': '', 'host': '', 'github': ''}
        return data

class CommentByPostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('url', 'content', 'remote_author_name', 'remote_author_url', 'contentType', 'published')

    def create(self, validated_data):
        post_id = self.context['parent']
        parent = Post.objects.get(pk=post_id)
        if not CanViewPost(parent, self.context['request'].user):
            raise exceptions.PermissionDenied('Attempted to create Comment with parent you cannot view')
        validated_data['parent'] = parent
        local_author = self.context['request'].user
        if not local_author.is_anonymous() and not IsRemoteAuthUser(local_author):
            validated_data['local_author'] = local_author
        comment = Comment.objects.create(**validated_data)
        return comment

    def to_representation(self, obj):
        data = super(CommentByPostSerializer, self).to_representation(obj)
        data['comment'] = data['content']
        data['pubDate'] = data['published']
        if 'local_author' in data and data['local_author'] is not None:
            data['author'] = data['local_author']
        elif data['remote_author_name'] != '':
            data['author'] = {'username': data['remote_author_name'], 'displayName': data['remote_author_name']}
            if data['remote_author_url'] != '':
                data['author']['url'] = data['remote_author_url']
                parsedURL = urlparse(data['remote_author_url'])
                data['author']['host'] = parsedURL.netloc
            data['author']['github'] = ''
        elif obj.local_author is not None:
            serializer = UserSerializer(obj.local_author, context={'request': self.context['request']})
            data['author']  = serializer.data
            data['local_author'] = serializer.data
        else:
            data['author'] = {'ERROR': 'This comment has neither a local nor remote author', 'username': ''
                              , 'displayName': '', 'url': '', 'host': '', 'github': ''}
        return data

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

class ImageCreateSerializer(serializers.HyperlinkedModelSerializer):
    image_data = serializers.ImageField()
    class Meta:
        model = Image
        fields = ('url', 'parent_post', 'file_type', 'image_data', 'published')

    def create(self, validated_data):
        uploader = self.context['request'].user
        validated_data['uploader'] = uploader
        validated_data['image_data'] = validated_data['image_data'].file.read()
        image = Image.objects.create(**validated_data)
        return image

class ImageSerializer(serializers.HyperlinkedModelSerializer):
    image_data = Base64Field()
    class Meta:
        model = Image
        fields = ('url', 'uploader', 'parent_post', 'file_type', 'image_data', 'published')

    def to_representation(self, obj):
        data = super(ImageSerializer, self).to_representation(obj)
        data['json_url'] = data['url'] + '?json'
        return data

class ImageSimpleSerializer(serializers.HyperlinkedModelSerializer):
    """
    Doesn't return image_data at all
    """
    class Meta:
        model = Image
        fields = ('url', 'uploader', 'parent_post', 'file_type', 'published')

    def to_representation(self, obj):
        data = super(ImageSimpleSerializer, self).to_representation(obj)
        data['json_url'] = data['url'] + '?json'
        return data

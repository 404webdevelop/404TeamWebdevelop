from rest_framework import serializers
from django.core.urlresolvers import reverse
from ..models import Author
from remotes.models import *
from remotes.utils import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'url', 'username', 'email', 'password', 'is_active', 'first_name', 'last_name',
                  'date_joined', 'github', 'picture')
        read_only_fields = ('id', 'url', 'is_active', 'date_joined')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = Author.objects.create_user(**validated_data)
        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        validated_data['email'] = validated_data.get('email', instance.email)
        validated_data['first_name'] = validated_data.get('first_name', instance.first_name)
        validated_data['last_name'] = validated_data.get('last_name', instance.last_name)
        validated_data['github'] = validated_data.get('github', instance.github)
        pw = validated_data.get('password', None)
        user = super(UserSerializer, self).update(instance, validated_data)
        if pw is not None:
            user.set_password(pw)
        user.save()
        return user

    def to_representation(self, obj):
        data = super(UserSerializer, self).to_representation(obj)
        request = self.context['request']
        data['posts'] = request.build_absolute_uri(reverse('post_by_author-list', args=(obj.id,)))
        data['displayName'] = data['username']
        if data['picture'] is not None and len(data['picture']) > 0:
            data['picture'] = data['url'] + 'profile_picture/'
        if data['github'].find('github.com/') == -1:
            data['github'] = 'https://api.github.com/users/' + data['github'] + '/events'
        data['host'] = request.get_host()
        return data

class RemoteAuthorSerializer(serializers.Serializer):
    data = serializers.CharField(max_length=None)

    def to_representation(self, obj):
        request = self.context['request']
        data = super(RemoteAuthorSerializer, self).to_representation(obj)
        jsonDict = json.loads(data['data'])
        for key in jsonDict:
            data[key] = jsonDict[key]
        del data['data']
        if 'username' not in data and 'displayName' in data:
            data['username'] = data['displayName']
        if 'url' in data:
            if not IsLocalURL(data['url'], request):
                data['url'] = request.build_absolute_uri(reverse('remote_author-list', args=(data['url'],)))
        if 'posts' in data:
            if not IsLocalURL(data['posts'], request):
                data['posts'] = request.build_absolute_uri(reverse('remote_post-list', args=(data['posts'],)))
        return data

def SerializeAuthors(authors, request):
    results = []
    for author in authors:
        if isinstance(author, Author):
            serializer = UserSerializer(author, context={'request': request})
            results.append(serializer.data)
        elif isinstance(author, RemoteAuthor):
            serializer = RemoteAuthorSerializer(author, context={'request': request})
            results.append(serializer.data)
        else:
            raise Exception()
    return results
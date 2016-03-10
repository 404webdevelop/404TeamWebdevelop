from rest_framework import serializers
from ..models import Author
from django.core.urlresolvers import reverse
from django.http import HttpRequest

# class AuthorProfileSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Author
#         fields = ('id', 'github', 'picture')
#         extra_kwargs = {'picture': {'write_only': True}}


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('id', 'url', 'username', 'email', 'password', 'is_active', 'first_name', 'last_name',
                  'date_joined', 'github', 'picture')
        read_only_fields = ('id', 'url', 'is_active', 'date_joined')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # author_data = validated_data.pop('author', None)
        user = Author.objects.create_user(**validated_data)
        # author_data['user'] = user
        # author = Author.objects.create(**author_data)
        # author.save()
        # user.author = author
        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        # author_data = validated_data.pop('author', None)
        user = super(UserSerializer, self).update(instance, validated_data)

        # if author_data:
        #     author_serializer = AuthorProfileSerializer()
        #     author = author_serializer.update(user.author, author_data)
        #     author.save()
        user.save()
        return user

    def to_representation(self, obj):
        data = super(UserSerializer, self).to_representation(obj)
        request = self.context['request']
        data['posts'] = request.build_absolute_uri(reverse('post_by_author-list', args = (obj.id,)))
        # if data['author'] is not None:
        #     authorDict = dict(data['author'])
        #     data['id'] = authorDict['id']
        #     data['github'] = authorDict['github']
        #     del data['author']
        data['displayName'] = data['username']
        if data['github'].find('github.com/') == -1:
            data['github'] = 'http://github.com/' + data['github']
        data['host'] = request.get_host()
        return data

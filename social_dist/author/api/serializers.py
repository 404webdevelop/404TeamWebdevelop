from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Author
from django.core.urlresolvers import reverse
from django.http import HttpRequest

class AuthorProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ('github', 'picture')
        extra_kwargs = {'picture': {'write_only': True}}


class UserSerializer(serializers.ModelSerializer):

    author = AuthorProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'author', 'password', 'is_active', 'first_name', 'last_name',
                  'date_joined')
        read_only_fields = ('id', 'url', 'is_active', 'date_joined')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        author_data = validated_data.pop('author', None)
        user = User.objects.create_user(**validated_data)
        author = Author.objects.create(**author_data)
        author.save()
        user.author = author
        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        author_data = validated_data.pop('author', None)
        user = super(UserSerializer, self).update(instance, validated_data)

        if author_data:
            author_serializer = AuthorProfileSerializer()
            author = author_serializer.update(user.author, author_data)
            author.save()
        user.save()
        return user

    def to_representation(self, obj):
        data = super(UserSerializer, self).to_representation(obj)
        request = self.context['request']
        data['posts'] = request.build_absolute_uri(reverse('post_by_author-list', args = (obj.id,)))
        return data

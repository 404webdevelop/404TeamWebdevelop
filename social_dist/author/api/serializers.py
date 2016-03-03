from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Author


class AuthorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('github', )


class UserSerializer(serializers.ModelSerializer):

    author = AuthorProfileSerializer()

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email', 'author', 'password', 'is_active', 'first_name', 'last_name',
                  'date_joined')
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True},
            'url': {'read_only': True},
            'username': {'read_only': True},
            'is_active': {'read_only': True},
            'date_joined': {'read_only': True},
        }

    def update(self, instance, validated_data):
        print validated_data.pop('password')
        author_data = validated_data.pop('author')

        user = super(UserSerializer, self).update(instance, validated_data)
        user.save()

        author = instance.author
        author.github = author_data.get('github', author.github)
        author.save()
        return user


class UserShortSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'is_active')



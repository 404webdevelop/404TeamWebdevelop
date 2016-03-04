from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import Author


class AuthorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('github',)


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
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        user = User.objects.create_user(username, email, password, **validated_data)
        author = Author.objects.create(user=user, github=author_data.get('github', ""))
        author.save()
        user.author = author
        user.is_active = False
        user.save()
        return user

    def update(self, instance, validated_data):
        author_data = validated_data.pop('author', None)
        user = super(UserSerializer, self).update(instance, validated_data)

        author = instance.author
        if author_data:
            author.github = author_data.get('github', author.github)
            author.save()
        user.save()
        return user



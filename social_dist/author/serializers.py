from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email')


class AuthorSerializer(serializers.ModelSerializer):
    github = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('url', 'username', 'github')

    def get_github(self, obj):
        return obj.author.github


class AuthorShortSerializer(AuthorSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'is_active')


class AuthorProfileSerializer(AuthorSerializer):

    class Meta:
        model = User
        fields = ('url', 'username', 'date_joined', 'github')

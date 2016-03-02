from rest_framework import serializers
from django.contrib.auth.models import User, Group


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'email')


class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'username')


class AuthorProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('url', 'username', 'date_joined')

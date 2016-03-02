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
        fields = ('id', 'url', 'username', 'email', 'github', 'password', 'is_active', 'first_name', 'last_name',
                  'date_joined')
        extra_kwargs = {
            'password': {'write_only': True},
            'is_active': {'read_only': True},
            'date_joined': {'read_only': True},
        }

        write_only_fields = ('password',)
        read_only_fields = ('is_active', 'date_joined',)

    def update(self, instance, validated_data):
        user = super(AuthorSerializer, self).update(instance, validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def get_github(self, obj):
        return obj.author.github


class AuthorShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'url', 'username', 'is_active')


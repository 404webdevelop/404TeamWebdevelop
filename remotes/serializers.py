from rest_framework import serializers
from .models import *

class RemotePostSerializer(serializers.Serializer):
	data = serializers.CharField(max_length=None)
	published = serializers.DateTimeField()

class RemoteAuthorSerializer(serializers.Serializer):
	data = serializers.CharField(max_length=None)
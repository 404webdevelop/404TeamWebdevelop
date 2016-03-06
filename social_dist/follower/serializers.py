from rest_framework import serializers
from django.contrib.auth.models import User
from follower.models import Follows, FollowManager



#https://docs.djangoproject.com/en/dev/topics/db/models/#extra-fields-on-many-to-many-relationships
# serializes only usernames of users
#class EachUserSerializer(serializers.ModelSerializer):
#	class Meta:
#	    model  = UserFollower
#	    fields = ('username',)

#class FollowerSerializer(serializers.ModelSerializer):

#	followers  = EachUserSerializer(many=True, read_only= True)
#	followings = EachUserSerializer(many=True,read_only=True)
#	class Meta:
#	    model  = UserFollower
#	    fields = ('url','username','followers','followings


class FollowSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Follows
        fields = ('followed', 'follower', 'hide')
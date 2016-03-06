from rest_framework import serializers
from django.contrib.auth.models import User
from follower.models import Follow
from follower.models import FollowingName
from follower.models import FollowerName



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
#	    fields = ('url','username','followers','followings')
		
class CurrentUserSerializer(serializers.ModelSerializer):
	following  = serializers.StringRelatedField(many=True)

	follower  = serializers.StringRelatedField(many=True)

	class Meta:
		model = Follow
		fields = ('url', 'owner_name', 'follower', 'following')


class AllFollowList(serializers.ModelSerializer):
	aggregateList = CurrentUserSerializer(many=True)
	class Meta:
		fields = ("aggregateList")
			

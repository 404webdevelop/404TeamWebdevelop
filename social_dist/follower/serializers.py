from rest_framework import serializers
from django.contrib.auth.models import User
from follower.models import Follow




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



class FollowerListSerializer(serializers.ListField):
	follower = serializers.CharField()
	
class CurrentUserSerializer(serializers.ModelSerializer):

	follower = FollowerListSerializer()
	following = FollowerListSerializer()
	class Meta:
		model = Follow
		fields = ('url', 'username', 'follower', 'following')

	def create(self, validated_data):
		username = validated_data.pop('username')
		follower = validated_data.pop('follower')
		following = validated_data.pop('following')
		follow = Follow.objects.create(username=username, follower=follower,following=following)
		follow.save()
		return follow
class AllFollowList(serializers.ModelSerializer):
	aggregateList = CurrentUserSerializer(many=True)
	class Meta:
		fields = ("aggregateList")
			

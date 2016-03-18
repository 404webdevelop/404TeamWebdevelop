from rest_framework import serializers
from follower.models import Follows, FollowManager


class FollowSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Follows
        fields = ('url', 'followed', 'follower', 'remote_author_name', 'remote_author_url', 'friend_request')

from rest_framework import serializers
from follower.models import Follows, FollowManager


class FollowSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Follows
        fields = ('url', 'followed', 'follower', 'hide', 'remote_author_id', 'remote_author_name', 'remote_author_url', 'remote_author_host')

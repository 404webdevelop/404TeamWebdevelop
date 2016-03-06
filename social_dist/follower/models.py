from django.db import models
from django.contrib.auth.models import User
import author
from datetime import datetime  

# Create your models here.
class Follow(models.Model):
	owner_name = models.CharField(max_length = 100, default='usernameBot', unique=True)
	date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)


class FollowingName(models.Model):
	follow = models.ForeignKey(Follow, related_name = 'following')
	followingName= models.CharField(max_length=100)
	def __unicode__(self):
		return '%s' % (self.followingName)   
class FollowerName(models.Model):
	follow = models.ForeignKey(Follow, related_name = 'follower')
	followerName= models.CharField(max_length=100)
	def __unicode__(self):
		return '%s' % (self.followerName)  
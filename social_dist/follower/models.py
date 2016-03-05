from django.db import models
from django.contrib.auth.models import User
import author
from datetime import datetime  

# Create your models here.
class Follow(models.Model):
	username = models.CharField(max_length = 100, default='usernameBot')
	date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
	follower= models.CharField(max_length=100, default = 'followerBot')
	following= models.CharField(max_length = 100, default='followingBot')


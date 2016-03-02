from django.db import models
from django.contrib.auth.models import User
import author
from datetime import datetime  

# Create your models here.
class UserFollower(models.Model):
	username = models.CharField(max_length=100,  default='userB')
	date_created = models.DateTimeField(default=datetime.now, blank=True)
	followings = models.ManyToManyField('self', related_name='following', symmetrical=False)
	followers = models.ManyToManyField('self', related_name='follower', symmetrical=False)
from django.db import models
from django.contrib.auth.models import User
import author
from datetime import datetime  

# Create your models here.
#class Follow(models.Model):
#	owner_name = models.CharField(max_length = 100, default='usernameBot', unique=True)
## 
#class FollowerName(models.Model):
#	followerName= models.CharField(max_length=100)
#	def __unicode__(self):
#		return '%s' % (self.followerName)  


class FollowManager(models.Manager):

	#call this by Follows.followmanager.getFollowers(authorname)
	def getFollowers(self, followed):
		#returns the followers of the arguement
		return self.get_queryset().filter(followed=followed)

	def getFollowing(self, follower):
		#returns the argument is following
		return self.get_queryset().filter(follower=follower)
	def mutualFollow(self, follower1, follower2):

		firstcase = self.isFollowing(follower1, follower2)
		reversecase = self.isFollowing(follower2, follower1)

		if not firstcase and not reversecase:
			self.follow(follower1, follower2)
			self.follow(follower2, follower1)
		elif not firstcase and reversecase:
			self.follow(follower1,follower2)
		elif firstcase and not reversecase:
			self.follow(follower2, follower1)
		else:
			print("dont add any")
	def mutualUnFollow(self, follower1,follower2):
		firstcase = self.isFollowing(follower1, follower2)
		reversecase = self.isFollowing(follower2, follower1)

		if not firstcase and not reversecase:
			self.unfollow(follower1, follower2)
			self.unfollow(follower2, follower1)
		elif not firstcase and reversecase:
			self.unfollow(follower1,follower2)
		elif firstcase and not reversecase:
			self.unfollow(follower2, follower1)
		else:
			print("dont add any")

		def follow(self, follower1, follower2):
			try:
				self.create(followed = follower1, follower = follower2)
				return True
			except:
				return False

	def unfollow(self, follower1, follower2):
		try:
			self.get(followed = follower1, follower = follower2).delete()
			return True
		except:
			return False

	def isFollowing(self, follower1, follower2):
		self.get_queryset().filter(followed=follower1, follower=follower2).exists()






class Follows(models.Model):
	followed = models.ForeignKey(User, related_name='followed')
	follower = models.ForeignKey(User, related_name='follower')

	hide = models.BooleanField(default=False)

	followManager = FollowManager()

	class Meta:
		verbose_name = "Following"
		verbose_name_plural = "Followers"
		unique_together = (('followed', 'follower'),)

	def __unicode__(self):  #For Python 2, use __str__ on Python 3
		try:
			return "{sender} is followed by {reciever}".format(sender=self.followed, reciever=self.follower)
		except:
			return "{solo} prob has no followers)".format(solo=self.followed)

	def getafollowing(self):
		return self.followed
	def getafollower(self):
		return self.follower
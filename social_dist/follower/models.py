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

class FriendManager(models.Manager):

	#call this by Friends.friendmanager.getFriends(authorname)
	#everything is mutual
	def getFriends(self, authorname):
		return self.get_queryset().filter(initiator=authorname, approvedrequest=True)

	def getAll(self, authorname):
		#grabs pending or approved
		return self.get_queryset().filter(initiator=authorname)


	def getRequests(self, authorname):
		return self.get_queryset().filter(initiator=authorname, approvedrequest=False)

	def mutualFriends(self, follower1, follower2):

		firstcase = self.isFriend(follower1, follower2)
		reversecase = self.isFriend(follower2, follower1)

		if not firstcase and not reversecase:
			self.follow(follower1, follower2)
			self.follow(follower2, follower1)
		elif not firstcase and reversecase:
			self.follow(follower1,follower2)
		elif firstcase and not reversecase:
			self.follow(follower2, follower1)
		else:
			print("dont add any")

	def addFriend(self, follower1, follower2):


		firstcase = self.isFriend(follower1, follower2)
		reversecase = self.isFriend(follower2, follower1)

		if not firstcase and not reversecase:
			self.friend(follower1, follower2)
			self.friend(follower2, follower1)
		elif not firstcase and reversecase:
			self.friend(follower1,follower2)
			self.friend(follower2,follower1)

		elif firstcase and not reversecase:
			self.friend(follower1,follower2)
			self.friend(follower2, follower1)
		else:
			print("dont add any")

	def mutualUnFriend(self, follower1, follower2):

		firstcase = self.isFriend(follower1, follower2)
		reversecase = self.isFriend(follower2, follower1)

		if not firstcase and not reversecase:
			self.unfriend(follower1, follower2)
			self.unfriend(follower2, follower1)
		elif not firstcase and reversecase:
			self.unfriend(follower1,follower2)
		elif firstcase and not reversecase:
			self.unfriend(follower2, follower1)
		else:
			print("dont add any")

	def follow(self, follower1, follower2):
		try:
			self.create(initiator = follower1, reciever = follower2)
			#self.create(initiator = follower1, reciever = follower2, approvedrequest=True)
			return True
		except:
			return False
	def friend(self, follower1, follower2):
		try:
			self.create(initiator = follower1, reciever = follower2, approvedrequest=True)
			return True
		except:
			return False

	def unfriend(self, follower1, follower2):
		try:
			self.get(initiator = follower1, reciever = follower2).delete()
			return True
		except:
			return False
	def get_api_friends(self, follower1, follower2):
		try:
			return self.get_queryset().filter(initiator=follower1, reciever=follower2)
		except:
			return False


	def isFriend(self, follower1, follower2):
		self.get_queryset().filter(initiator=follower1, reciever=follower2).exists()

	def confirmFriend(self, follower1, follower2):
		if (self.get_queryset().filter(initiator=follower1, reciever=follower2).exists()):
			self.get(initiator=follower1, reciever=follower2).delete()
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

	objects = FollowManager()

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

class Friends(models.Model):
	initiator = models.ForeignKey(User, related_name='initiator')
	reciever = models.ForeignKey(User, related_name='reciever')

	#this can be removed due to the following use case
	sentrequest =  models.BooleanField(default=False)
	approvedrequest = models.BooleanField(default=False)

	fof_private = models.BooleanField(default=False)
	friend_private = models.BooleanField(default=False)
	own_private = models.BooleanField(default=False)
	remote_private = models.BooleanField(default=False)

	objects = FriendManager()

	class Meta:
		verbose_name = "Friends"
		verbose_name_plural = "Friends"
		unique_together = (('initiator', 'reciever'),)

	def __unicode__(self):  #For Python 2, use __str__ on Python 3
		try:
			return "{sender} initiated friendship with {reciever}".format(sender=self.initiator, reciever=self.reciever)
		except:
			return "{solo} prob has no friends)".format(solo=self.initiator)
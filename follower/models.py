from django.db import models
from author.models import Author

class FollowManager(models.Manager):
    # call this by Follows.objects.getFollowers(author id)

    def getFollowers(self, id):
        # filter(A, B) is AND relation
        # filter(A).filter(B) is OR relation
        # source:http://stackoverflow.com/questions/8164675/chaining-multiple-filter-in-django-is-this-a-bug

        return self.get_queryset().filter(followed=id).filter(remote_author_id = id, followed = None)


    def getFollowing(self, id):
        # filter(A, B) is AND relation
        # filter(A).filter(B) is OR relation
        # source:http://stackoverflow.com/questions/8164675/chaining-multiple-filter-in-django-is-this-a-bug
        
        return self.get_queryset().filter(follower=id).filter(remote_author_id = id, follower = None)


    def mutualFollow(self, follower1, follower2):
        firstcase = self.isFollowing(follower1, follower2)
        reversecase = self.isFollowing(follower2, follower1)


        if not firstcase and not reversecase:
            self.follow(follower1, follower2)
            self.follow(follower2, follower1)
        elif not firstcase and reversecase:
            self.follow(follower1, follower2)
        elif firstcase and not reversecase:
            self.follow(follower2, follower1)
        else:
            print("dont add any")


    def mutualUnFollow(self, follower1, follower2):
        firstcase = self.isFollowing(follower1, follower2)
        reversecase = self.isFollowing(follower2, follower1)

        if not firstcase and not reversecase:
            self.unfollow(follower1, follower2)
            self.unfollow(follower2, follower1)
        elif not firstcase and reversecase:
            self.unfollow(follower1, follower2)
        elif firstcase and not reversecase:
            self.unfollow(follower2, follower1)
        else:
            print("dont add any")


    def follow(self, followed, follower):
        follow = self.create(followed=followed, follower=follower)
        return follow


    def unfollow(self, follower1, follower2):
        try:
            self.get(followed=follower1, follower=follower2).delete()
            return True
        except:
            return False


    def check_friend_request(self, friend_request):
        pass

    def isFollowing(self, follower1, follower2):
        follow_exist = self.get_queryset().filter(followed=follower1, follower=follower2).exists()
        if follow_exist:
            return True
        else:
            return False


class Follows(models.Model):
    
    followed = models.ForeignKey(Author, related_name='followed', null=True, blank=True)
    follower = models.ForeignKey(Author, related_name='follower', null=True, blank=True)
    remote_author_host = models.CharField(max_length=1024, null=True, blank=True)
    remote_author_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    remote_author_name = models.CharField(max_length=1024, null=True, blank=True)
    remote_author_url = models.CharField(max_length=1024, null=True, blank=True)
    objects = FollowManager()

    class Meta:
        verbose_name = "Following"
        verbose_name_plural = "Followers"
        unique_together = (('followed', 'follower'),)

    def __unicode__(self):  
        # For Python 2, use __str__ on Python 3
        try:
            return "{sender} is followed by {reciever}\n".format(sender=self.followed, reciever=self.follower)
        # return "{reciever\n}".format(reciever=self.reciever)
        except:
            return "{solo} prob has no followers)".format(solo=self.followed)

    def getafollowing(self):
        return self.followed

    def getafollower(self):
        return self.follower

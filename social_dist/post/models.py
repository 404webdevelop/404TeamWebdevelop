from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length = 300)
    content = models.CharField(max_length = 5000)
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    last_modified = models.DateTimeField(auto_now_add=True, blank=True)

    PERMISSIONS_CHOICES = (
        ('pub', 'Public'),
        ('me', 'Private to me'),
        ('friends', 'Friends only'),
        ('fof', 'Friends of friends'),
    )
    privacy_level = models.CharField(max_length = 10, choices = PERMISSIONS_CHOICES, default='pub', blank=True)
    privacy_host_only = models.BooleanField(default = False, blank=True) # if True, only users on this host may view
    privacy_whitelist = models.ManyToManyField(User, related_name = '+', blank=True) # Users on this list may always view

    # TODO: one post one image? or just insert an embed code for the user maybe
    # image = models.ForeignKey(Image, null=True, on_delete=models.SET_NULL)


class Image(models.Model):
    uploader = models.ForeignKey(User, on_delete = models.CASCADE)
    file_type = models.CharField(max_length = 50)
    image_data = models.BinaryField()
    date_created = models.DateTimeField(auto_now_add=True, blank=True)


class Comment(models.Model):
    author_id = models.CharField(max_length = 100) # id (could be local or remote) of comment author
    author_origin = models.CharField(max_length = 1000, default='', blank=True) # hostname of comment author's home server
    parent = models.ForeignKey(Post, on_delete=models.CASCADE) # post that this comment belongs to
    content = models.CharField(max_length = 1000)
    date_created = models.DateTimeField(auto_now_add=True, blank=True)
    last_modified = models.DateTimeField(auto_now_add=True, blank=True)


def get_post_for_author(author):
    return Post.objects.all().filter(author=author)
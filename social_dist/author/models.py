from django.db import models
from django.contrib.auth.models import User


class Author(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    github = models.CharField(max_length=1024, blank=True)
    picture = models.ImageField(upload_to='profile_pic/', blank=True, null=True, default='')

    class Meta:
        app_label = 'author'






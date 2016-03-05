from django.db import models
from django.contrib.auth.models import User


class Author(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    github = models.CharField(max_length=1024, blank=True)

    class Meta:
        app_label = 'author'



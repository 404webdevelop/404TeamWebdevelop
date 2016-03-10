from django.db import models
from django.contrib.auth.models import User
import uuid

class Author(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    github = models.CharField(max_length=1024, blank=True)
    picture = models.ImageField(upload_to='profile_pic/', blank=True, null=True, default='')

    class Meta:
        app_label = 'author'






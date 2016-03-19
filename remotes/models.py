from django.db import models
from author.models import Author

# Create your models here.
class RemoteServer(models.Model):
    hostname = models.CharField(max_length=2000)

    local_user = models.ForeignKey(Author, blank=True, null=True)

    remote_username = models.CharField(max_length=500, blank=True)
    remote_password = models.CharField(max_length=200, blank=True)

    active = models.BooleanField(blank=True, default=True)
from django.db import models
from author.models import Author

# Create your models here.
class RemoteServer(models.Model):
    hostname = models.CharField(max_length=2000) # e.g. 'someapp.herokuapp.com' or '127.0.0.1:8001'

    local_user = models.ForeignKey(Author, blank=True, null=True) # credentials that they use to login to our server

    remote_username = models.CharField(max_length=500, blank=True) # credentials that we use to login to their server
    remote_password = models.CharField(max_length=200, blank=True)

    active = models.BooleanField(blank=True, default=True)
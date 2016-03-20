import json
from django.utils.dateparse import parse_datetime

from django.db import models
from author.models import Author

class BadDataException(Exception):
    pass

# Create your models here.
class RemoteServer(models.Model):
    hostname = models.CharField(max_length=2000) # e.g. 'someapp.herokuapp.com/api' or '127.0.0.1:8001/api'

    local_user = models.ForeignKey(Author, blank=True, null=True) # credentials that they use to login to our server

    remote_username = models.CharField(max_length=500, blank=True) # credentials that we use to login to their server
    remote_password = models.CharField(max_length=200, blank=True)

    active = models.BooleanField(blank=True, default=True)

class RemotePost(object):
    def __init__(self, data):
        self.data = json.dumps(data)
        if 'published' in data:
            self.published = parse_datetime(data['published'])
        elif 'pubDate' in data:
            self.published = parse_datetime(data['pubDate'])
        else:
            raise BadDataException('No published date in RemotePost data')

class RemoteAuthor(object):
    def __init__(self, data):
        self.data = json.dumps(data)
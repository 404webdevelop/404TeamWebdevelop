import requests # http://docs.python-requests.org/en/master/
import json
from urlparse import urlparse

from .models import RemoteServer, RemotePost
from .serializers import *

def IsRemoteAuthUsername(localUsername):
    """
    Is the user for a remote server's authentication?
    (e.g. if yes, don't let them make posts)
    """
    return len([server for server in RemoteServer.objects.all()
                if server.local_user is not None and server.local_user.username == localUsername]) > 0

def IsRemoteAuthUser(user):
    return len([server for server in RemoteServer.objects.all()
                if server.local_user is not None and server.local_user.id == user.id]) > 0

class _RemoteServer:
    def __init__(self, host, credentials = None, requestingUser = None):
        self.host = 'http://' + host
        self.credentials = credentials
        if requestingUser is not None and not requestingUser.is_anonymous():
            self.requestingUser = requestingUser
        else:
            self.requestingUser = None

    def _RequestingUser(self):
        if self.requestingUser is not None:
            return {'remote': self.requestingUser}
        else:
            return dict()

    def Get(self, relUrl):
        r = requests.get(self.host + relUrl, auth=self.credentials, params=self._RequestingUser())
        return r

    def Post(self, relUrl, data):
        r = requests.post(self.host + relUrl, data, auth=self.credentials, params=self._RequestingUser())
        return r

def GetRemoteServers(requestingUser):
    def MakeRemoteServer(row):
        if row.remote_username != '' and row.remote_password != '':
            credentials = (row.remote_username, row.remote_password)
        else:
            credentials = None
        return _RemoteServer(row.hostname, credentials, requestingUser)
    return [MakeRemoteServer(row) for row in RemoteServer.objects.all() if row.active]

def _ExtractData(json, name):
    if name in json:
        remoteDicts = json[name]
    elif name + 's' in json:
        remoteDicts = json[name + 's']
    elif 'data' in json:
        remoteDicts = json['data']
    elif isinstance(json, list):
        remoteDicts = json
    else:
        remoteDicts = []
    return remoteDicts

def IsGoodPostsResponse(r):
    if r.status_code != 200:
        return False
    if ('size' in r.json() and r.json()['size'] > 0):
        return True
    if 'query' in r.json() and r.json()['query'] in ['posts', 'post', 'data']:
        return True
    if isinstance(r.json(), list):
        return True
    return False

def IsGoodAuthorsResponse(r):
    if r.status_code != 200:
        return False
    if ('size' in r.json() and r.json()['size'] > 0):
        return True
    if 'query' in r.json() and r.json()['query'] in ['posts', 'post', 'data']:
        return True
    if isinstance(r.json(), list):
        return True
    return False

def GetAllRemotePosts(requestingUser = None):
    servers = GetRemoteServers(requestingUser)
    remotePosts = []
    for server in servers:
        assert isinstance(server, _RemoteServer)
        try:
            r = server.Get('/posts')
        except requests.exceptions.ConnectionError: # remote server down
            continue
        if IsGoodPostsResponse(r):
            remotePostDicts = _ExtractData(r.json(), 'post')
            for remotePostDict in remotePostDicts:
                try:
                    remotePosts.append(RemotePost(remotePostDict))
                except BadDataException:
                    pass
    return remotePosts

def GetAllRemoteAuthors(requestingUser = None):
    servers = GetRemoteServers(requestingUser)
    remoteAuthors = []
    for server in servers:
        assert isinstance(server, _RemoteServer)
        try:
            r = server.Get('/author')
        except requests.exceptions.ConnectionError: # remote server down
            continue
        if IsGoodAuthorsResponse(r):
            remoteAuthorDicts = _ExtractData(r.json(), 'author')
            for remoteAuthorDict in remoteAuthorDicts:
                try:
                    remoteAuthors.append(RemoteAuthor(remoteAuthorDict))
                except BadDataException:
                    pass
    return remoteAuthors

def GetServerAndPathForUrl(url, requestingUser):
    parsedURL = urlparse(url)
    netloc = parsedURL.netloc
    servers = [server for server in GetRemoteServers(requestingUser) if netloc in server.host]
    if len(servers) < 1:
        return None, None
    elif len(servers) > 1:
        print('Warning: multiple servers matching {0}'.format(netloc))
    server = servers[0]

    ind = url.find(server.host)
    if ind == -1:
        print('Error: problem with URL {0}'.format(url))
        return None, None
    path = url[ind+len(server.host):]

    return server, path

def GetOneRemoteAuthor(url, requestingUser = None):
    server, path = GetServerAndPathForUrl(url, requestingUser)

    # do the request
    try:
        r = server.Get(path)
    except requests.exceptions.ConnectionError: # remote server down
        return None

    if r.status_code != 200:
        return None
    try:
        remoteAuthor = RemoteAuthor(r.json())
    except BadDataException:
        return None

    return remoteAuthor

def GetRemotePostsAtUrl(url, requestingUser = None):
    server, path = GetServerAndPathForUrl(url, requestingUser)

    if server is None:
        return None

    # do the request
    try:
        r = server.Get(path)
    except requests.exceptions.ConnectionError: # remote server down
        return None

    if not IsGoodPostsResponse(r):
        return None
    remotePostDicts = _ExtractData(r.json(), 'post')
    remotePosts = []
    for remotePostDict in remotePostDicts:
        try:
            remotePosts.append(RemotePost(remotePostDict))
        except BadDataException:
            pass

    return remotePosts

def IsLocalURL(url, request):
    parsedHostURL = urlparse(request.build_absolute_uri())
    print(parsedHostURL.netloc)
    print(url)
    return parsedHostURL.netloc in url
import requests # http://docs.python-requests.org/en/master/
import json
from urlparse import urlparse
from django.core.urlresolvers import reverse

from .models import RemoteServer, RemotePost, RemoteComment
from .serializers import *
from django.http import QueryDict

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

def ContainsARemoteHostname(s):
    if s[0:4] != 'http':
        s = 'http://' + s
    parsedURL = urlparse(s)
    netloc = parsedURL.netloc
    servers = [server for server in GetRemoteServers() if netloc in server.host]
    if len(servers) < 1:
        return False
    else:
        return True

def GetRemoteHostContaining(s):
    if s[0:7] == 'http://':
        s = s[7:]
    while s[-1] == '/':
        s = s[:-1]
    servers = [server for server in GetRemoteServers() if s in server.host]
    return servers[0].host

def GetRemoteHostForArbitraryUrl(s):
    if s[0:4] != 'http':
        s = 'http://' + s
    parsedURL = urlparse(s)
    netloc = parsedURL.netloc
    servers = [server for server in GetRemoteServers() if netloc in server.host]
    if len(servers) < 1:
        return None
    else:
        return servers[0].host

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
        if relUrl[-1] != '/':
            relUrl = relUrl + '/'
        if 'blooming' in self.host: # SPECIAL CASE
            headers = {'Bearer': 'sh3nr<7n,G<>ku.^Kibit0-_B(?)ra' + 'www.blooming-earth-129.heroku.com'
                       ,'Authorization': 'Bearer sh3nr<7n,G<>ku.^Kibit0-_B(?)ra' + 'www.blooming-earth-129.heroku.com'}
        else:
            headers = {}
        r = requests.post(self.host + relUrl, json=data, auth=self.credentials, params=self._RequestingUser(), headers=headers)
        return r

def GetRemoteServers(requestingUser = None):
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
    if 'query' in r.json() and r.json()['query'] in ['author', 'authors', 'user', 'users', 'data']:
        return True
    if isinstance(r.json(), list):
        return True
    return False

def IsGoodCommentsResponse(r):
    if r.status_code != 200:
        return False
    if ('size' in r.json() and r.json()['size'] > 0):
        return True
    if 'query' in r.json() and r.json()['query'] in ['comments', 'comment', 'data']:
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

def GetRemoteCommentsAtUrl(url, requestingUser = None):
    server, path = GetServerAndPathForUrl(url, requestingUser)

    if server is None:
        return None

    # do the request
    try:
        r = server.Get(path)
    except requests.exceptions.ConnectionError: # remote server down
        return None

    if not IsGoodCommentsResponse(r):
        return None
    remoteCommentDicts = _ExtractData(r.json(), 'comment')
    remoteComments = []
    for remoteCommentDict in remoteCommentDicts:
        try:
            remoteComments.append(RemoteComment(remoteCommentDict))
        except BadDataException:
            pass

    return remoteComments

def PostRemoteCommentAtUrl(url, data, request, requestingUser = None):
    if requestingUser is None or requestingUser.is_anonymous():
        return 'You need to be logged in do make remote comments'

    server, path = GetServerAndPathForUrl(url, requestingUser)

    if server is None:
        return 'Could not find a registered remote server corresponding to the POST url'

    # fill in author info from requestingUser
    if isinstance(data, QueryDict):
        data = data.dict()
    author = {}
    author['id'] = str(requestingUser.id)
    author['host'] = request.get_host()
    author['displayName'] = requestingUser.username
    author['url'] = request.build_absolute_uri(reverse('author-detail', args=(requestingUser.id,)))
    author['github'] = requestingUser.github
    data.update({'author': author})

    # do the post
    try:
        r = server.Post(path, data)
    except requests.exceptions.ConnectionError: # remote server down
        return 'Failed to connect to the remote server'

    if r.status_code not in [200, 201]:
        d = {'Error': 'POST-ed to the remote server but they returned status code {0}'.format(r.status_code)}
        d.update(data)
        d['post_to_url'] = path
        d['orig_url'] = url
        return d

    return True

def IsLocalURL(url, request):
    parsedHostURL = urlparse(request.build_absolute_uri())
    print(parsedHostURL.netloc)
    print(url)
    return parsedHostURL.netloc in url

def PostWithListOfFriends(data, postHint = None, authorHint = None):
    """
    data is {'query': 'friends', 'author': '<id>', 'authors': [<list of id>]}
    postHint is a remote post dict
    authorHint is a remote author dict

    Returns (False, errorStr) on failure
    Returns (True, dataDict) on success
    """
    assert postHint is not None or authorHint is not None

    if postHint is not None and 'url' in postHint:
        hint = postHint['url']
    elif postHint is not None and 'origin' in postHint:
        hint = postHint['origin']
    elif postHint is not None and 'source' in postHint:
        hint = postHint['source']
    elif authorHint is not None and 'url' in authorHint:
        hint = authorHint['url']
    elif authorHint is not None and 'host' in authorHint:
        hint = authorHint['host']
    else:
        return False, 'PostWithListOfFriends: No URL hint supplied'

    host = GetRemoteHostForArbitraryUrl(hint)
    if host is None:
        return False, 'PostWithListOfFriends: Failed to find host for the URL'

    url = host + '/friends/' + data['author']

    server, path = GetServerAndPathForUrl(url, None)
    if server is None:
        return False, 'PostWithListOfFriends: Unexpected failure'

    # do the post
    try:
        r = server.Post(path, data)
    except requests.exceptions.ConnectionError: # remote server down
        return False, 'PostWithListOfFriends: Failed to connect to the remote server'

    if r.status_code not in [200, 201]:
        return False, 'PostWithListOfFriends: Bad status code {0}'.format(r.status_code)

    return True, r.json()

def PostFriendRequest(data, hints):
    hints = [hint.strip() for hint in hints if hint.strip() != '']
    if len(hints) == 0:
        return False, 'No hints for PostFriendRequest'

    foundHost = False
    host = None
    for hint in hints:
        host = GetRemoteHostForArbitraryUrl(hint)
        if host is not None:
            foundHost = True
            break
    if not foundHost or host is None:
        return False, 'PostFriendRequest: Failed to find host for the hint URL'

    url = host + '/friendrequest'

    server, path = GetServerAndPathForUrl(url, None)
    if server is None:
        return False, 'PostFriendRequest: Unexpected failure'

    # do the post
    try:
        r = server.Post(path, data)
    except requests.exceptions.ConnectionError: # remote server down
        return False, 'PostFriendRequest: Failed to connect to the remote server'

    if r.status_code not in [200, 201]:
        return False, 'PostFriendRequest: Bad status code {0}'.format(r.status_code)

    return True, r.json()

# Example POST function
def PostAtUrl(url, data, request):
    """
    Example:
    PostAtUrl('http://remote.server.com/api/stuff/morestuff', {'name': 'logan'}, request)
    """
    server, path = GetServerAndPathForUrl(url, request.user)
    if server is None:
        return None # could not find remote server matching the url

    try:
        r = server.Post(path, data)
    except requests.exceptions.ConnectionError:
        return None # failed to connect to the remote server

    if r.status_code not in [200, 201]:
        return None # the POST failed somehow

    return r.text
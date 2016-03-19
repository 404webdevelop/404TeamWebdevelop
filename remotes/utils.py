from .models import RemoteServer
import requests # http://docs.python-requests.org/en/master/

def IsRemoteAuthUsername(localUsername):
    """
    Is the user for a remote server's authentication?
    (e.g. if yes, don't let them make posts)
    """
    return len([server for server in RemoteServer.objects.all()
                if server.local_user is not None and server.local_user.username == localUsername]) > 0

class _RemoteServer:
    def __init__(self, host, credentials = None, requestingUser = None):
        self.host = host
        self.credentials = credentials
        self.requestingUser = requestingUser

    def _RequestingUser(self):
        if self.requestingUser is not None:
            return {'remote': self.requestingUser}
        else:
            return dict()

    def Get(self, relUrl):
        r = requests.get(self.host + relUrl, auth=self.credentials, params=self._RequestingUser())
        return r.json(), r.status_code()

    def Post(self, relUrl, data):
        r = requests.post(self.host + relUrl, data, auth=self.credentials, params=self._RequestingUser())
        return r.json(), r.status_code()

def GetRemoteServers(requestingUser):
    def MakeRemoteServer(row):
        if row.remote_username != '' and row.remote_password != '':
            credentials = (row.remote_username, row.remote_password)
        else:
            credentials = None
        return _RemoteServer(row.hostname, credentials, requestingUser)
    return [MakeRemoteServer(row) for row in RemoteServer.objects.all()]

def GetAllRemotePosts(requestingUser = None):
    servers = GetRemoteServers(requestingUser)
    for server in servers:
        assert isinstance(server, _RemoteServer)
        json, status = server.Get('/posts')
        # TODO: now what?
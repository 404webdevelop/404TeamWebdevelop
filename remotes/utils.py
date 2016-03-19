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
    def __init__(self, host, credentials = None):
        self.host = host
        self.credentials = credentials

    def Get(self, relUrl):
        return requests.get(self.host + relUrl, auth=self.credentials)

    def Post(self, relUrl, data):
        return requests.post(self.host + relUrl, data)

def GetRemoteServers():
    def MakeRemoteServer(row):
        if row.remote_username != '' and row.remote_password != '':
            credentials = (row.remote_username, row.remote_password)
        else:
            credentials = None
        return _RemoteServer(row.hostname, credentials)
    return [MakeRemoteServer(row) for row in RemoteServer.objects.all()]

def GetAllRemotePosts():
    servers = GetRemoteServers()
    for server in servers:
        assert isinstance(server, _RemoteServer)
        server.Get('/posts')
        # TODO: now what?
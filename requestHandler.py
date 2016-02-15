import httpInbound

class handler(object):
	def parseRequest(self):
		method = '';
		path = '';
		if(method == "GET"):
			if(path == '/logout/'):
				httpInbound.register();
			elif(path == '/post/'):
				#Handle ID vs List
				httpInbound.serveFeed();
				httpInbound.servePost();
			elif(path == '/image/'):
				httpInbound.serveImage();
			elif(path == '/comment/'):
				httpInbound.serveComment();
			elif(path == '/profile/'):
				httpInbound.serveUser();
		elif(method == "POST"):
			if(path == '/signup/'):
				httpInbound.register();
			elif(path == '/login/'):
				httpInbound.userLogin();
			elif(path == '/post/'):
				#Full vs Privacy
				httpInbound.changePostPrivacy();
				httpInbound.updatePost();
			elif(path == '/comment/'):
				httpInbound.updateComment();
			elif(path == '/profile/'):
				httpInbound.updateProfile();
		elif(method == "PUT"):
			if(path == '/post/'):
				httpInbound.addPost():
			elif(path == '/image/'):
				httpInbound.addImage();
			elif(path == '/comment/'):
				httpInbound.addComment();
			elif(path == '/follow/'
				httpInbound.addFriend();
		elif(method == "DELETE"):
			if(path == '/post/'):
				httpInbound.deletePost();
			elif(path == '/image/'):
				httpInbound.deleteImage();
			elif(path == '/comment/'):
				httpInbound.deleteComment();
			elif(path == '/follow/'
				httpInbound.deleteFriend();
		else:
			
	def send100(self):
		pass
	def send200(self):
		pass
	def send201(self):
		pass
	def send204(self):
		pass
	def send302(self):
		pass
	def send400(self):
		pass
	def send401(self):
		pass
	def send403(self):
		pass
	def send404(self):
		pass
	def send408(self):
		pass
	def send410(self):
		pass
	def send418(self):
		pass
	def send500(self):
		pass
	def send501(self):
		pass

	


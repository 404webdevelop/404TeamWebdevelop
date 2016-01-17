#!/usr/bin/env python

# Copyright (c) Yu Zuo

import socket, os ,sys,select

serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,1)

serverSocket.bind(("0.0.0.0",12345))

serverSocket.listen(5)

while True:
	print "Waiting for connection..."
	(incomingSocket, address) = serverSocket.accept()
	print "We got a connection from %s" % (str (address))

	pid =os.fork()
	if(pid == 0):
		#We must be in the child process
		outgoingSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)	
		outgoingSocket.connect(("www.google.com",80))


		bufer = bytearray()
		while True:
			incomingSocket.setblocking(0)
			try:
				part = incomingSocket.recv(1024)
			except IOError,exception:
				if exception.errno == 11:
					part = None
				else:
					raise
			if (part):
				bufer.extend(part)
				outgoingSocket.sendall(part)

			outgoingSocket.setblocking(0)
			
			try:
				part = outgoingSocket.recv(1024)
			except IOError, exception:
				if exception.errno == 11:
					part = None
				else:
					raise

			if (part):
				bufer.extend(part)
				incomingSocket.sendall(part)
			select.select(
				[incomingSocket,outgoingSocket],
				[],
				[incomingSocket,outgoingSocket],
				1.0)	

		print bufer
		sys.exit(0)
	else:
		#we must be in the parent process
		pass

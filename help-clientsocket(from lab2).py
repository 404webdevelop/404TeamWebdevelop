#!/user/bin/env python


import socket

clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

clientSocket.connect(("www.google.com",80))

request = "GET / HTT/1.0\n\n"

clientSocket.sendall(request)

bufer = bytearray()
done =False
while True:
	part = clientSocket.recv(1024)
	if (part):
		bufer.extend(part)
	else:
		break
print bufer

from rest_framework.test import APITestCase
from rest_framework import status
from django.core.urlresolvers import reverse
from author.models import Author
from follower.models import Follows
from models import Post

class FriendTest(APITestCase):
	def follow_test(self):
		url = reverse("follower-list")
		author_a = Author.objects.create(username="aaa", email="a@404.com", password='0000')
        author_b = Author.objects.create(username="bbb", email="b@404.com", password='0000')
        #Follows.objects.create(follower=author_a, followed=author_b).save()
        self.client.force_authenticate(user=author_a)
        data = {
        		"follower": author_a,
        		"following": author_b}
        response= self.client.post(url, data, format='json')

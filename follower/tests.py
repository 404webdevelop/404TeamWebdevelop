from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from rest_framework import status
from django.core.urlresolvers import reverse
from author.models import Author
from author.api.serializers import UserSerializer
from follower.models import Follows
from follower.serializers import FollowSerializer
import json

class FriendTest(APITestCase):

        count = 0


        def test_follow(self):
                url = reverse("follows-list")
                factory = APIRequestFactory()

                author_a = Author.objects.create(username="aaa", password='1')
                author_b = Author.objects.create(username="bbb", email="b@404.com", password='0000')

                request_a = factory.get('/author/', {'username': 'aaa'})
                request_b = factory.get('/author/', {'username': 'bbb'})
                a_url= UserSerializer(author_a, context={'request': request_a}).data['url']
                b_url= UserSerializer(author_b, context={'request': request_b}).data['url']

                self.client.force_authenticate(user=author_a)
                data = {
                        "follower": a_url,
                        "followed": b_url}
                response= self.client.post(url, data, format='json')

                self.assertEqual(response.status_code, status.HTTP_200_OK)
                self.assertEqual(response.data['followed'], b_url, 'followed user are not same')
                self.assertEqual(response.data['follower'], a_url, 'follower user are not same')

                '''
                checking two new created user follow action done
                '''


        def test_get_follower(self):
                url = reverse("follows-list")
                factory = APIRequestFactory()

                author_a = Author.objects.create(username="aaa", password='1')
                author_b = Author.objects.create(username="bbb", email="b@404.com", password='0000')

                self.client.force_authenticate(user=author_b)
                Follows.objects.create(follower=author_b, followed=author_a).save()

                result = Follows.objects.getFollowers(author_a)
                request = factory.get('/follow/'+ str(author_b.id))

                print FollowSerializer(result, context={'request': request})

                

                
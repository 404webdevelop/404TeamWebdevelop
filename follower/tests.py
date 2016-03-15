from rest_framework.test import APITestCase
from rest_framework.test import APIRequestFactory

from rest_framework import status
from django.core.urlresolvers import reverse
from author.models import Author
from author.api.serializers import UserSerializer
from follower.models import Follows
from follower.serializers import FollowSerializer
from rest_framework.test import APIClient
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
                print request_a
                #print request_a
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
                
                request_b = factory.get('/author/', {'username': 'bbb'})
                follow= Follows.objects.get(follower=author_b, followed=author_a)
                request = factory.get('/follow/',  {'follower': author_b.id})

                author_b_url= UserSerializer(author_b, context={'request': request_b}).data['url']
                self.assertEqual(author_b_url, FollowSerializer(follow, context={'request': request}).data['follower'])
                

        def test_get_followed(self):
                url = reverse("follows-list")
                factory = APIRequestFactory()  

                author_a = Author.objects.create(username="aaa", password='1')
                author_b = Author.objects.create(username="bbb", email="b@404.com", password='0000')
                self.client.force_authenticate(user=author_b)
                Follows.objects.create(follower=author_b, followed=author_a).save()        
                
                request_a = factory.get('/author/', {'username': 'aaa'})
                follow= Follows.objects.get(follower=author_b, followed=author_a)
                request = factory.get('/follow/',  {'followed': author_a.id})
                print request.GET
                author_a_url= UserSerializer(author_a, context={'request': request_a}).data['url']
                self.assertEqual(author_a_url, FollowSerializer(follow, context={'request': request}).data['followed'])



class FriendTest(APITestCase):

    client = APIClient(enforce_csrf_checks=True)

    def setUp(self):
        u = Author.objects.create_superuser(username='apitest1', email='apitest1@apitest.com', password='apitest1')
        u.save()
        login = self.client.login(username = 'apitest1', password = 'apitest1')
        self.assertTrue(login)

    # test for POST on /service/friends/userid/
    def test_friend_one(self):
        response = self.client.post('/service/friends/67/', {"query": "friends", "author": "9de17f29c12e8f97bcbbd34cc908f1baba40658e", "authors": ["69", "68", "67"]}, format='json')
        self.assertEqual(response.status_code, 200)

    # test for GET on /service/friends/userid1/userid2/
    def test_friend_two(self):
        response = self.client.get('/service/friends/67/68/')
        self.assertEqual(response.status_code, 200)

    def tearDown(self):
        self.client.logout()
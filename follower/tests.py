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
        a_url= UserSerializer(author_a, context={'request': request_a}).data['url']
        b_url= UserSerializer(author_b, context={'request': request_b}).data['url']

        self.client.force_authenticate(user=author_a)
        data = {
                    "followed": b_url,
                    "follower": a_url,
                    "remote_author_id": "",
                    "remote_author_name": "",
                    "remote_author_url": "",
                    "remote_author_host": ""
                }
        response= self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['followed'], b_url, 'followed user are not same')
        self.assertEqual(response.data['follower'], a_url, 'follower user are not same')


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

        author_a_url= UserSerializer(author_a, context={'request': request_a}).data['url']
        self.assertEqual(author_a_url, FollowSerializer(follow, context={'request': request}).data['followed'])


    def test_is_friend(self):
        
        author_a= Author.objects.create(username="aaa", password='1')
        author_b= Author.objects.create(username="bbb", email="b@404.com", password='0000')

        author_a.save()
        author_b.save()

        self.client.force_authenticate(user=author_a)

        follow_1= Follows.objects.create(follower=author_b, followed=author_a)
        follow_2= Follows.objects.create(follower=author_a, followed=author_b)

        follow_1.save()
        follow_2.save()

        request= self.client.get('/friends/' + str(author_a.id)+ '/'+ str(author_b.id)+ '/')
        result= request.data['friends']
        self.assertEqual(result, True)


    def test_friend_list(self):
        author_c= Author.objects.create(username="ccc", password='1')
        author_d= Author.objects.create(username="ddd", email="d@404.com", password='0000')

        author_c.save()
        author_d.save()

        self.client.force_authenticate(user=author_c)

        follow_1= Follows.objects.create(follower=author_d, followed=author_c)
        follow_2= Follows.objects.create(follower=author_c, followed=author_d)

        follow_1.save()
        follow_2.save()

        request= self.client.get('/api/friends/' + str(author_c.id)+ '/')

        self.assertEqual(request.data['authors'][0], author_d.id)
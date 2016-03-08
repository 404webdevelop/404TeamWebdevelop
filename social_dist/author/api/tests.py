from rest_framework.test import APITestCase
from django.core.urlresolvers import reverse
from rest_framework import status

from django.contrib.auth.models import User
from ..models import Author

#http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
class UserTest(APITestCase):
    count = 0

    def create_a_user(self):
        username = 'user_%d' % self.count
        email = 'u%d@email.com' % self.count
        user = User.objects.create_user(username, email, '0000')
        author = Author.objects.create(user=user)
        author.save()
        user.save()
        self.count += 1
        return user

    def test_create(self):
        url = reverse('user-list')
        data = {
            "username": "user_1",
            "password": "0000",
            "email": "u1@email.com",
            "author": {
                "github": "user1"
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.get_by_natural_key('user_1')
        self.assertEqual(user.email, 'u1@email.com')
        self.assertEqual(user.author.github, 'user1')

    def test_list(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
        self.create_a_user()
        self.create_a_user()
        self.create_a_user()
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

    def test_authentication(self):
        user = self.create_a_user()
        url = reverse('user-detail', kwargs={'pk': user.id})
        data = {}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_patch(self):
        user = self.create_a_user()
        url = reverse('user-detail', kwargs={'pk': user.id})
        data = {
            "first_name": "User",
            "last_name": "One",
            "author": {
                "github": "123123123"
            }
        }
        self.client.force_authenticate(user=user)
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = User.objects.get_by_natural_key(user.username)
        self.assertEqual(user.first_name, 'User')
        self.assertEqual(user.last_name, 'One')
        self.assertEqual(user.author.github, "123123123")





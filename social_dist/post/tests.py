from rest_framework.test import APITestCase
from rest_framework import status
from django.core.urlresolvers import reverse
from author.models import Author
from follower.models import Follows
from models import Post


class PostTest(APITestCase):

    def test_create_post(self):
        author_d = Author.objects.create(username="ddd", email="d@404.com", password='0000')
        url = reverse('post-list')
        self.client.force_authenticate(user=author_d)
        post = {
            "title": "t1",
            "content": "c1",
            "privacy_level": "me",
            "privacy_host_only": False
        }
        res = self.client.post(url, post, format='json')
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data["username"], author_d.username)

    def setup(self):
        author_a = Author.objects.create(username="aaa", email="a@404.com", password='0000')
        author_b = Author.objects.create(username="bbb", email="b@404.com", password='0000')
        author_c = Author.objects.create(username="ccc", email="c@404.com", password='0000')
        Follows.objects.create(follower=author_a, followed=author_b).save()
        Follows.objects.create(follower=author_b, followed=author_a).save()

        public_post = Post.objects.create(
            title="public_post",
            author=author_a,
            content="public_post_content",
            privacy_level="pub"

        )
        public_post.save()

        friends_post = Post.objects.create(
            title="friends_post",
            author=author_a,
            content="friends_post_content",
            privacy_level="friend"
        )
        friends_post.save()

        private_post = Post.objects.create(
            title="private_post",
            author=author_a,
            content="private_post_content",
            privacy_level="me"
        )
        private_post.save()
        return [author_a, author_b, author_c]

    def test_public_post(self):
        self.setup()
        url = reverse('visible_posts-list')
        res = self.client.get(url, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertTrue(res.data["count"] == 1)
        title = res.data["posts"][0]['title']
        self.assertEqual(title, "public_post")

    def test_friend_post(self):
        authors = self.setup()
        url = reverse('visible_posts-list')
        self.client.force_authenticate(user=authors[1])
        res = self.client.get(url, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["count"], 2)

    def test_private_post(self):
        authors = self.setup()
        url = reverse('visible_posts-list')
        self.client.force_authenticate(user=authors[0])
        res = self.client.get(url, format='json')
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        print res.data["count"]
        self.assertEqual(res.data["count"], 3)


class CommentTest(APITestCase):

    def test_create(self):
        author_a = Author.objects.create(username="ddd", email="d@404.com", password='0000')
        public_post = Post.objects.create(
            title="public_post",
            author=author_a,
            content="public_post_content",
            privacy_level="pub"

        )
        public_post.save()

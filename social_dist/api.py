from rest_framework import routers
from author.api.views import AuthorViewSet, RemoteAuthorViewSet
from post.views import *
from follower.views import FollowViewSet, FriendViewSet, FriendlistViewSet

# http://stackoverflow.com/questions/17496249/in-django-restframework-how-to-change-the-api-root-documentation
class MyRouter(routers.DefaultRouter):
    def get_api_root_view(self):
        api_root_view = super(MyRouter, self).get_api_root_view()
        ApiRootClass = api_root_view.cls

        class MyAPIRoot(ApiRootClass):
            """
            _In general, our API matches Abram's example-article.json_

            ## [Posts](/api/posts) \n
            - create, list, edit, delete: [`/posts`](/api/posts) _<-- try clicking_
            - list all the posts that I authored: [`/author/myposts`](/api/author/myposts)
            - list all the posts I can view: [`/author/posts`](/api/author/posts)
            - list by author: `/author/{author_id}/posts`

            ## [Comments](/api/comments) \n
            - create, list, edit, delete: [`/comments`](/api/comments)
            - list, create by parent post: `/api/posts/{post_id}/comments`

            ## [Images](/api/images) \n
            - create, delete: [`/images`](/api/images)

            ## [Authors](/api/author) \n
            - create, list, edit, delete: [`/author`](/api/author)

            ## [Follow](/api/follow) \n
            - Internal use only, DO NOT make any remote request to these api
            - create, list, delete: [`/follow`](/api/follow)
            - get: get current local author's follower list `/api/follow/author_id/localAuthorFollowers`
            - get: get current remote author's follower list `/api/follow/author_id/remoteauthorFollowers`
            - get: get current local author's following list `/api/follow/author_id/localAuthorFollowings`
            - get: get current remote author's following list `/api/follow/author_id/remoteAuthorFollowings`

            ## [Friend]() \n
            - internal use only for project part 2
            - get: `/friends/author_id`
            - post: `/friends/author_id`
            - get: `/friends/author_id/author_id`
            - post: `/friendrequest/`

            - /friendrequest/ POST example:

                \t{
                        "query":"friendrequest",
                        "author": {

                            "id":"de305d54-75b4-431b-adb2-eb6b9e546013",
                            "host":"http://127.0.0.1:5454/",
                            "displayName":"Greg Johnson"
                        },
                        "friend": {
                            "id":"de305d54-75b4-431b-adb2-eb6b9e637281",
                            "host":"http://127.0.0.1:5454/",
                            "displayName":"Lara Croft",
                            "url":"http://127.0.0.1:5454/author/9de17f29c12e8f97bcbbd34cc908f1baba40658e"
                        }
                \t}

            - friends/author_id POST example:

                \t{
                        "query":"friends",
                        "author":"<authorid>",
                        # Array of Author UUIDs
                        "authors": [
                            "de305d54-75b4-431b-adb2-eb6b9e546013",
                            "ae345d54-75b4-431b-adb2-fb6b9e547891",
                            "...",
                            "...",
                            "..."
                            ]
                \t}
                
            - reponds with

                \t{
                        "query":"friends",
                        "author":"9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                        "authors": [
                            "de305d54-75b4-431b-adb2-eb6b9e546013",
                            "ae345d54-75b4-431b-adb2-fb6b9e547891",
                            "..."
                        ]
                \t}

            ## **Interoperating?**
            - For `secret-inlet-51780.herokuapp.com/api`, please login with the following credentials:
                - Username: `remoteuser`
                - Password: `abc`
            - You should login with these credentials while making requests from your app and while browsing the api in the browser
            - Logging in as `remoteuser` ensures that you won't see any stuff that's not from our server (ie. only local posts)


            _Edit this documentation in `social_dist/api.py`_

            """
            pass

        return MyAPIRoot.as_view()

router = MyRouter()

# Post views
router.register(r'author/posts', PostViewSet, base_name='visible_posts')
router.register(r'author/myposts', MyPosts, base_name='my_posts') # not required by the spec
router.register(r'posts', PostViewSet)
router.register(r'author/(?P<author_id>[0-9a-f\-]+)/posts', PostByAuthor, base_name='post_by_author')
router.register(r'remoteposts/(?P<remote_url>.+)', RemotePostsViewSet, base_name='remote_post')

# Comment views
router.register(r'posts/(?P<post_id>[0-9a-f\-]+)/comments', CommentByPost, base_name='comment_by_post')
router.register(r'comments', CommentViewSet) # not required by the spec
router.register(r'remotecomments/(?P<remote_url>.+)', RemoteCommentByPost, base_name='remote_comment_by_post')

# Image views
router.register(r'images', ImageViewSet)

# Author views
router.register(r'author', AuthorViewSet)
router.register(r'remoteauthor/(?P<remote_url>.+)', RemoteAuthorViewSet, base_name='remote_author')

# Friend views TODO
router.register(r'follow', FollowViewSet)




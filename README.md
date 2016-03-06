# CMPUT 404 Winter 2016 Project.

[Development Setup](https://github.com/404webdevelop/404TeamWebdevelop/wiki/Development-Setup)


## Useful URLs

Homepage: [127.0.0.1:8000/](http://127.0.0.1:8000/)

REST Framework API Root: [127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

Upload an image: [127.0.0.1:8000/post/debug/upload_image/](http://127.0.0.1:8000/post/debug/upload_image/)

### Having problems with migrations/weird errors? Try this

* Delete `post/migrations/0001_initial.py`
* Delete `db.sqlite3`
* `python manage.py makemigrations post`
* `python manage.py makemigrations author`
* `python manage.py migrate`
* `python manage.py createsuperuser`

##APIs

*URLs are not made as link, because most of them would use GET method, accessing with single click.

###Token & Login:
(POST only)

```
    http://localhost:8000/auth-token/
```

If authenticated, it will return

```
{
  "token": "781d26b5b7ae0a88b7ec2e3563a3ad5deebf1219"
}
```

Otherwise, it will give you related error message.

This also can be a will to login. In this way, login does not redirect to anywhere. Front-end application need to take care of redirection after successful login.


###Authentication

Server now supports Basic Auth, Token Auth and Session Auth.

Session Auth is not recommended. It's add because browsable API site needs it. 

For how to make Basic Auth request with jquery, click [here](http://stackoverflow.com/a/5507289)

For how to make Token Auth request with jquery, add following to request header.

```
Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```
*Replace 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b with token you get.

###Authors

Author API uses [default router](http://www.django-rest-framework.org/api-guide/routers/#defaultrouter) from django REST frame work.
 
```
    http://localhost:8000/api/authors/
```
- GET: return a list of short version of authors
- POST: create a new author, example: [http://localhost:8000/demo-signup](http://localhost:8000/demo-signup)


‘’‘
    http://localhost:8000/api/authors/me
’‘’
- POST: Post with username, password. It will response user object and token.

Check [http://localhost:8000/demo-update](http://localhost:8000/demo-update) to see the example.

```
    http://localhost:8000/api/authors/:id/
```
- GET: return detail info for author with id
- PUT, PATCH: (auth) update author, logged in author can only update his/her own info

[Here is a ajax post example for signup a new user](https://gist.github.com/wyushi/6aa73ae671fe6fa15526)


```
    http://localhost:8000/api/authors/:id/profile_picutre/
```
- GET: get profile picture for author with id (no auth)
- POST: post image file to replace auhtor's profile picture (need auth). 

Check [http://localhost:8000/demo-update](http://localhost:8000/demo-update) to see the example.


##Frameworks & Libraries

[jquery.lightbox_me.js](https://github.com/buckwilson/Lightbox_me)

[Django REST framework](https://github.com/tomchristie/django-rest-framework/tree/master)

##Contributors

  * Qiang Yu
  * Yu Zuo
  * Logan Lin
  * James Cadek
  * Yushi Wang

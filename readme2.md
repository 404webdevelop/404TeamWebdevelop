##URLs

You can use [Postman](http://www.getpostman.com/) to play with the api.

###Token & Login:

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

Server supports Basic Auth, Token Auth and Session Auth.

I think we would better use Token Auth, or secondly Basic Auth. Session Auth is not recommanded. But it all front end decision.

###URLs

get token: (POST only)
```
    http://localhost:8000/auth-token/
```


get list of authors with very brief user info: (GET) - no auth 
```
    http://localhost:8000/api/authors/
```

get limited author detail that author choose to be public: (GET) - no auth
```
    http://localhost:8000/api/authors/:id/profile/
```


self: (GET, PUT) - auth
```
    http://localhost:8000/api/authors/:id/
```

So here is the rank of info contained in each url about certain author (from more to less):
```
    self > profile > author in list
```










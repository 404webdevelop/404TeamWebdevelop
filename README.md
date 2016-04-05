# CMPUT 404 Winter 2016 Project.

[Development Setup](https://github.com/404webdevelop/404TeamWebdevelop/wiki/Development-Setup)

### Video Demo:

Youtube link: [Here](https://www.youtube.com/watch?v=AQ5uafWopOQ)
### Useful URLs

Homepage: [127.0.0.1:8000/](http://127.0.0.1:8000/)

REST Framework API Root: [127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

### Having problems with migrations/weird errors? Try this

* In `post/migrations/*`, `author/migrations/*`, and `follower/migrations/*` --> delete all files __except__ `__init__.py` (the deleted files should all start with `0001` or `0002`)
* Delete `db.sqlite3`
* `python manage.py makemigrations`
* `python manage.py migrate`
* `python manage.py createsuperuser`

### Testing connecting the server to a local clone of itself

* Copy+paste the entire project
* `python manage.py runserver 127.0.0.1:8000` for one copy
* `python manage.py runserver 127.0.0.1:8001` for the other copy
* On both servers, use `/api/author` to create a **remote auth user**
* On both server, use `/admin` to add a remote server
  * Hostname: 127.0.0.1:8001/api or 127.0.0.1:8000/api
  * Local user: [the **remote auth user** you created]
  * Remote username & Remote password: credentials for the **remote auth user** on the other server
* The two servers should now be connected and pulling posts from each other

### Run the tests

* `python manage.py test`
* They should all pass all the time

## Demo

[Demo site on Heroku](http://secret-inlet-51780.herokuapp.com/)

[Demo API](http://secret-inlet-51780.herokuapp.com/api/)

## Contributors

  * Qiang Yu
  * Yu Zuo
  * Logan Lin
  * James Cadek
  * Yushi Wang

## License

Apache License
Version 2.0, January 2004

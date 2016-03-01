# 404TeamWebdevelop

CMPUT 404 Winter 2016 Project.

##Development Setup

```$ cd project/root```

Install virtual environment:

```$ virtualenv .venv```

The reason I suggest making our virtual env called ```.venv``` is it is in the ```.gitignore``` file

Activate virtual env:

```$ source .venv/bin/activate```

Install dependencies:

```$ pip install -r requirements.txt```

Test whether the virtual env is working:

```$ which python```

Deactivate:

```$ deactivate```

## URL's

Homepage: [127.0.0.1:8000/](http://127.0.0.1:8000/)

REST Framework API Root: [127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

Upload an image: [127.0.0.1:8000/post/debug/upload_image/](http://127.0.0.1:8000/post/debug/upload_image/)

## Having problems with migrations/weird errors? Try this

* Delete post/migrations/0001_initial.py
* Delete db.sqlite3
* python `manage.py makemigrations post`
* python `manage.py makemigrations author`
* python `manage.py migrate`
* python `manage.py createsuperuser`

##Contributors

  * Qiang Yu
  * Yu Zuo
  * Logan Lin
  * James Cadek
  * Yushi Wang

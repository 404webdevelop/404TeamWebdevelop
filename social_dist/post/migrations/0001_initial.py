# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('author_id', models.CharField(max_length=100)),
                ('author_origin', models.CharField(max_length=1000)),
                ('content', models.CharField(max_length=1000)),
                ('date_created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('file_type', models.CharField(max_length=50)),
                ('image_data', models.BinaryField()),
                ('date_created', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=300)),
                ('content', models.CharField(max_length=5000)),
                ('date_created', models.DateTimeField()),
                ('last_modified', models.DateTimeField()),
                ('privacy_level', models.CharField(max_length=10, choices=[(b'pub', b'Public'), (b'me', b'Private to me'), (b'friends', b'Friends only'), (b'fof', b'Friends of friends')])),
                ('privacy_host_only', models.BooleanField()),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('privacy_whitelist', models.ManyToManyField(related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(to='post.Post'),
        ),
    ]

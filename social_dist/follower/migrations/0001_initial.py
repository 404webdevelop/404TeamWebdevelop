# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserFollower',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('username', models.CharField(default=b'userB', max_length=100)),
                ('date_created', models.DateTimeField(default=datetime.datetime.now, blank=True)),
                ('followers', models.ManyToManyField(related_name='follower', to='follower.UserFollower')),
                ('followings', models.ManyToManyField(related_name='following', to='follower.UserFollower')),
            ],
        ),
    ]

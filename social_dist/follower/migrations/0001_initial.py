# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Follow',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('owner_name', models.CharField(default=b'usernameBot', unique=True, max_length=100)),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FollowerName',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('followerName', models.CharField(max_length=100)),
                ('follow', models.ForeignKey(related_name='follower', to='follower.Follow')),
            ],
        ),
        migrations.CreateModel(
            name='FollowingName',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('followingName', models.CharField(max_length=100)),
                ('follow', models.ForeignKey(related_name='following', to='follower.Follow')),
            ],
        ),
    ]

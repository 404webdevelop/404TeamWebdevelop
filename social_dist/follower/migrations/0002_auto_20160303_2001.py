# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
        ('follower', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Follower',
            fields=[
                ('user', models.OneToOneField(primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='followers',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('current_user', models.ForeignKey(related_name='followers', to='follower.Follower')),
            ],
        ),
        migrations.RemoveField(
            model_name='userfollower',
            name='followers',
        ),
        migrations.RemoveField(
            model_name='userfollower',
            name='followings',
        ),
        migrations.DeleteModel(
            name='UserFollower',
        ),
    ]

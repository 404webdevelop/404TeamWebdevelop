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
            name='Follows',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('hide', models.BooleanField(default=False)),
                ('followed', models.ForeignKey(related_name='followed', to=settings.AUTH_USER_MODEL)),
                ('follower', models.ForeignKey(related_name='follower', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Following',
                'verbose_name_plural': 'Followers',
            },
        ),
        migrations.CreateModel(
            name='Friends',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sentrequest', models.BooleanField(default=False)),
                ('approvedrequest', models.BooleanField(default=False)),
                ('fof_private', models.BooleanField(default=False)),
                ('friend_private', models.BooleanField(default=False)),
                ('own_private', models.BooleanField(default=False)),
                ('remote_private', models.BooleanField(default=False)),
                ('initiator', models.ForeignKey(related_name='initiator', to=settings.AUTH_USER_MODEL)),
                ('reciever', models.ForeignKey(related_name='reciever', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Friends',
                'verbose_name_plural': 'Friends',
            },
        ),
        migrations.AlterUniqueTogether(
            name='friends',
            unique_together=set([('initiator', 'reciever')]),
        ),
        migrations.AlterUniqueTogether(
            name='follows',
            unique_together=set([('followed', 'follower')]),
        ),
    ]

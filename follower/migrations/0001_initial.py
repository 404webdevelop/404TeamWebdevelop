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
                ('remote_author_host', models.CharField(max_length=1024, null=True, blank=True)),
                ('remote_author_id', models.CharField(max_length=1024, null=True, blank=True)),
                ('remote_author_name', models.CharField(max_length=1024, null=True, blank=True)),
                ('remote_author_url', models.CharField(max_length=1024, null=True, blank=True)),
                ('hide', models.BooleanField(default=False)),
                ('followed', models.ForeignKey(related_name='followed', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
                ('follower', models.ForeignKey(related_name='follower', blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
            options={
                'verbose_name': 'Following',
                'verbose_name_plural': 'Followers',
            },
        ),
        migrations.AlterUniqueTogether(
            name='follows',
            unique_together=set([('followed', 'follower'), ('remote_author_id', 'followed'), ('remote_author_id', 'follower')]),
        ),
    ]

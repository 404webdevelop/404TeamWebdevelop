# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('follower', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='follows',
            name='friend_request',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='follows',
            name='remote_author_name',
            field=models.CharField(default=b'', max_length=100, blank=True),
        ),
        migrations.AddField(
            model_name='follows',
            name='remote_author_url',
            field=models.CharField(default=b'', max_length=1000, blank=True),
        ),
    ]

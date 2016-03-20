# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('follower', '0003_auto_20160320_2104'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follows',
            name='followed',
            field=models.ForeignKey(related_name='followed', blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='follows',
            name='follower',
            field=models.ForeignKey(related_name='follower', blank=True, to=settings.AUTH_USER_MODEL, null=True),
        ),
        migrations.AlterField(
            model_name='follows',
            name='remote_author_host',
            field=models.CharField(max_length=1024, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='follows',
            name='remote_author_name',
            field=models.CharField(max_length=1024, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='follows',
            name='remote_author_url',
            field=models.CharField(max_length=1024, null=True, blank=True),
        ),
    ]

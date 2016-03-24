# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='contentType',
            field=models.CharField(default=b'text/plain', max_length=50, choices=[(b'text/plain', b'text/plain'), (b'text/markdown', b'text/markdown'), (b'text/x-markdown', b'text/x-markdown')]),
        ),
        migrations.AddField(
            model_name='post',
            name='contentType',
            field=models.CharField(default=b'text/plain', max_length=50, choices=[(b'text/plain', b'text/plain'), (b'text/markdown', b'text/markdown'), (b'text/x-markdown', b'text/x-markdown')]),
        ),
    ]

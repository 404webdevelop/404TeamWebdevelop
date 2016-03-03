# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('follower', '0002_auto_20160303_2001'),
    ]

    operations = [
        migrations.AddField(
            model_name='follower',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]

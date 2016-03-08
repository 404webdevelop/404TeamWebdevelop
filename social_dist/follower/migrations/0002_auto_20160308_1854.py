# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('follower', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='friends',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='friends',
            name='initiator',
        ),
        migrations.RemoveField(
            model_name='friends',
            name='reciever',
        ),
        migrations.DeleteModel(
            name='Friends',
        ),
    ]

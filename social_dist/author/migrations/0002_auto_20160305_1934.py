# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('author', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profileimage',
            name='image_data',
            field=models.BinaryField(default=b'', null=True, blank=True),
        ),
    ]

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('author', '0002_auto_20160305_1934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='picture',
            field=models.BinaryField(default=b''),
        ),
        migrations.DeleteModel(
            name='ProfileImage',
        ),
    ]

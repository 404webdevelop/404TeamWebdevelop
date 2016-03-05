# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('author', '0004_auto_20160305_1947'),
    ]

    operations = [
        migrations.AlterField(
            model_name='author',
            name='picture',
            field=models.ImageField(default=b'', null=True, upload_to=b'/profile_pic/', blank=True),
        ),
        migrations.DeleteModel(
            name='ProfileImage',
        ),
    ]

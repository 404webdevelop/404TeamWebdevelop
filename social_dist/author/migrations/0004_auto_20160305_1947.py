# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('author', '0003_auto_20160305_1943'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProfileImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image_data', models.ImageField(default=b'', null=True, upload_to=b'/profile_pic/', blank=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AlterField(
            model_name='author',
            name='picture',
            field=models.ForeignKey(blank=True, to='author.ProfileImage', null=True),
        ),
    ]

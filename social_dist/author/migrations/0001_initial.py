# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('user', models.OneToOneField(primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('github', models.CharField(max_length=1024, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProfileImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image_data', models.ImageField(default=b'', null=True, upload_to=b'', blank=True)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='author',
            name='picture',
            field=models.ForeignKey(blank=True, to='author.ProfileImage', null=True),
        ),
    ]

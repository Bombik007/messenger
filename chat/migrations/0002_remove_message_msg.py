# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-10 20:30
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='message',
            name='msg',
        ),
    ]

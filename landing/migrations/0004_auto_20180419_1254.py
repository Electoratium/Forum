# Generated by Django 2.0.2 on 2018-04-19 09:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0003_auto_20180419_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentaries',
            name='comment_date',
            field=models.DateTimeField(auto_created=True, blank=True, default=datetime.datetime(2018, 4, 19, 12, 54, 7, 888517)),
        ),
        migrations.AlterField(
            model_name='messages',
            name='post_date',
            field=models.DateTimeField(auto_created=True, blank=True, default=datetime.datetime(2018, 4, 19, 12, 54, 7, 888517)),
        ),
    ]

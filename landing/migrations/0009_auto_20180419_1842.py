# Generated by Django 2.0.2 on 2018-04-19 15:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('landing', '0008_auto_20180419_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentaries',
            name='comment_date',
            field=models.DateTimeField(auto_created=True, blank=True, default=datetime.datetime(2018, 4, 19, 18, 42, 19, 422812)),
        ),
        migrations.AlterField(
            model_name='commentaries',
            name='comment_text',
            field=models.CharField(max_length=800),
        ),
        migrations.AlterField(
            model_name='messages',
            name='message_text',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='messages',
            name='post_date',
            field=models.DateTimeField(auto_created=True, blank=True, default=datetime.datetime(2018, 4, 19, 18, 42, 19, 422812)),
        ),
    ]

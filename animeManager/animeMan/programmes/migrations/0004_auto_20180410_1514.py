# Generated by Django 2.0.4 on 2018-04-10 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programmes', '0003_auto_20180410_1508'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='episodes',
            field=models.IntegerField(blank=True),
        ),
    ]

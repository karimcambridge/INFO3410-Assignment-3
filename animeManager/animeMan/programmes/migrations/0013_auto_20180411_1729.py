# Generated by Django 2.0.4 on 2018-04-11 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programmes', '0012_auto_20180411_1031'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='icon',
            field=models.ImageField(blank=True, default='img/profiles/neutralface.png', null=True, upload_to='img/profiles/', verbose_name='Anime Photo'),
        ),
    ]
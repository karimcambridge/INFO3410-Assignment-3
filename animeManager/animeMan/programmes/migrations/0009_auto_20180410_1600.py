# Generated by Django 2.0.4 on 2018-04-10 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programmes', '0008_auto_20180410_1525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='anime_id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]

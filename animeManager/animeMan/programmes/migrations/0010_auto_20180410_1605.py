# Generated by Django 2.0.4 on 2018-04-10 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('programmes', '0009_auto_20180410_1600'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anime',
            name='anime_id',
            field=models.CharField(max_length=12, primary_key=True, serialize=False),
        ),
    ]
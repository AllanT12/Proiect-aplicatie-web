# Generated by Django 3.2 on 2021-05-26 17:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='events',
            name='Date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='events',
            name='Time',
            field=models.TimeField(),
        ),
    ]

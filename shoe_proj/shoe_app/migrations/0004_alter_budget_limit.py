# Generated by Django 4.1.7 on 2023-03-31 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoe_app', '0003_user_budget_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget',
            name='limit',
            field=models.FloatField(default=0),
        ),
    ]

# Generated by Django 4.0.4 on 2022-11-18 13:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0002_rename_results_result'),
    ]

    operations = [
        migrations.RenameField(
            model_name='result',
            old_name='results',
            new_name='score',
        ),
    ]
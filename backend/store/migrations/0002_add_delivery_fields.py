# Generated migration - Add delivery fields and approval status

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='patronymic',
            field=models.CharField(blank=True, max_length=100, verbose_name='Отчество'),
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_region',
            field=models.CharField(
                choices=[('minsk', 'По Минску'), ('belarus', 'По Республике Беларусь'), ('russia', 'По России')],
                default='minsk',
                max_length=20,
                verbose_name='Регион доставки'
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_method',
            field=models.CharField(
                choices=[('pickup', 'Самовывоз'), ('yandex', 'Яндекс Доставка'), ('europochta', 'Европочта'), ('cdek', 'СДЕК')],
                default='pickup',
                max_length=20,
                verbose_name='Способ доставки'
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='order',
            name='delivery_address',
            field=models.TextField(blank=True, verbose_name='Адрес доставки'),
        ),
        migrations.AddField(
            model_name='order',
            name='europochta_branch',
            field=models.CharField(blank=True, max_length=100, verbose_name='Номер отделения Европочты'),
        ),
        migrations.AddField(
            model_name='order',
            name='approved',
            field=models.BooleanField(default=False, verbose_name='Одобрено/Выполнено'),
        ),
        migrations.AddField(
            model_name='order',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='contact_method',
            field=models.CharField(
                blank=True,
                choices=[('telegram', 'Telegram'), ('instagram', 'Instagram')],
                max_length=20,
                verbose_name='Способ связи'
            ),
        ),
        migrations.AlterField(
            model_name='order',
            name='contact_id',
            field=models.CharField(blank=True, max_length=200, verbose_name='ID контакта (TG/IG)'),
        ),
    ]

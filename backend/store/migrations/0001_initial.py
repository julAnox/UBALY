# Generated migration

from django.db import migrations, models
import django.core.validators


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Название товара')),
                ('category', models.CharField(choices=[('clothing', 'Одежда'), ('accessories', 'Аксессуары'), ('footwear', 'Обувь')], max_length=50, verbose_name='Категория')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, validators=[django.core.validators.MinValueValidator(0)], verbose_name='Цена (BYN)')),
                ('image1', models.URLField(verbose_name='Фото 1')),
                ('image2', models.URLField(verbose_name='Фото 2')),
                ('image3', models.URLField(verbose_name='Фото 3')),
                ('description', models.TextField(blank=True, verbose_name='Описание')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Товар',
                'verbose_name_plural': 'Товары',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Имя')),
                ('surname', models.CharField(max_length=100, verbose_name='Фамилия')),
                ('phone', models.CharField(max_length=20, verbose_name='Номер телефона')),
                ('contact_method', models.CharField(choices=[('telegram', 'Telegram'), ('instagram', 'Instagram')], max_length=20, verbose_name='Способ связи')),
                ('contact_id', models.CharField(max_length=200, verbose_name='ID контакта (TG/IG)')),
                ('payment_method', models.CharField(choices=[('card', 'Перевод на карту'), ('cash', 'Наличные'), ('online', 'Онлайн-оплата')], max_length=20, verbose_name='Способ оплаты')),
                ('items', models.JSONField(verbose_name='Товары в заказе')),
                ('total', models.DecimalField(decimal_places=2, max_digits=10, validators=[django.core.validators.MinValueValidator(0)], verbose_name='Общая сумма')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
                'ordering': ['-created_at'],
            },
        ),
    ]

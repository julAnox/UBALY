from django.db import models
from django.core.validators import MinValueValidator
import json


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('clothing', 'Одежда'),
        ('accessories', 'Аксессуары'),
        ('footwear', 'Обувь'),
    ]

    CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    FOOTWEAR_SIZES = [str(i) for i in range(36, 47)]

    title = models.CharField(max_length=200, verbose_name="Название товара")
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        verbose_name="Категория"
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name="Цена (BYN)"
    )
    image1 = models.URLField(verbose_name="Фото 1")
    image2 = models.URLField(verbose_name="Фото 2")
    image3 = models.URLField(verbose_name="Фото 3")
    description = models.TextField(blank=True, verbose_name="Описание")
    sizes = models.JSONField(default=list, blank=True, verbose_name="Размеры")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    def __str__(self):
        return self.title

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'category': self.category,
            'price': float(self.price),
            'image1': self.image1,
            'image2': self.image2,
            'image3': self.image3,
            'description': self.description,
            'sizes': self.sizes if isinstance(self.sizes, list) else [],
        }


class Order(models.Model):
    CONTACT_METHOD_CHOICES = [
        ('telegram', 'Telegram'),
        ('instagram', 'Instagram'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('card', 'Перевод на карту'),
        ('cash', 'Наличные'),
        ('online', 'Онлайн-оплата'),
    ]

    DELIVERY_REGION_CHOICES = [
        ('minsk', 'По Минску'),
        ('belarus', 'По Республике Беларусь'),
        ('russia', 'По России'),
    ]

    DELIVERY_METHOD_CHOICES = [
        ('pickup', 'Самовывоз'),
        ('yandex', 'Яндекс Доставка'),
        ('europochta', 'Европочта'),
        ('cdek', 'СДЕК'),
    ]

    name = models.CharField(max_length=100, verbose_name="Имя")
    surname = models.CharField(max_length=100, verbose_name="Фамилия")
    patronymic = models.CharField(max_length=100, blank=True, verbose_name="Отчество")
    phone = models.CharField(max_length=20, verbose_name="Номер телефона")
    contact_method = models.CharField(
        max_length=20,
        choices=CONTACT_METHOD_CHOICES,
        blank=True,
        verbose_name="Способ связи"
    )
    contact_id = models.CharField(max_length=200, blank=True, verbose_name="ID контакта (TG/IG)")
    delivery_region = models.CharField(
        max_length=20,
        choices=DELIVERY_REGION_CHOICES,
        verbose_name="Регион доставки"
    )
    delivery_method = models.CharField(
        max_length=20,
        choices=DELIVERY_METHOD_CHOICES,
        verbose_name="Способ доставки"
    )
    delivery_address = models.TextField(blank=True, verbose_name="Адрес доставки")
    europochta_branch = models.CharField(max_length=100, blank=True, verbose_name="Номер отделения Европочты")
    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        verbose_name="Способ оплаты"
    )
    items = models.JSONField(verbose_name="Товары в заказе")
    total = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)],
        verbose_name="Общая сумма"
    )
    approved = models.BooleanField(default=False, verbose_name="Одобрено/Выполнено")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    def __str__(self):
        status = "✓" if self.approved else "○"
        return f"[{status}] Заказ #{self.id} - {self.name} {self.surname}"

    def get_items_display(self):
        """Format items for display in admin"""
        if isinstance(self.items, str):
            return self.items
        return json.dumps(self.items, indent=2, ensure_ascii=False)

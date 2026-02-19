from django.contrib import admin
from django import forms
from .models import Product, Order


class ProductAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        clothing_sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
        footwear_sizes = [str(i) for i in range(36, 47)]
        
        category = self.instance.category if self.instance.pk else None
        available_sizes = footwear_sizes if category == 'footwear' else clothing_sizes if category == 'clothing' else []
        
        self.fields['sizes'] = forms.MultipleChoiceField(
            choices=[(size, size) for size in available_sizes],
            widget=forms.CheckboxSelectMultiple,
            required=False,
            label='Размеры'
        )
        
        if self.instance.pk and self.instance.sizes:
            self.fields['sizes'].initial = self.instance.sizes
    
    def clean(self):
        cleaned_data = super().clean()
        category = cleaned_data.get('category')
        sizes = cleaned_data.get('sizes')
        
        if category == 'footwear':
            valid_sizes = [str(i) for i in range(36, 47)]
        elif category == 'clothing':
            valid_sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
        else:
            valid_sizes = []
        
        if sizes and category in ['footwear', 'clothing']:
            for size in sizes:
                if size not in valid_sizes:
                    raise forms.ValidationError(f"Invalid size {size} for category {category}")
        
        return cleaned_data
    
    class Meta:
        model = Product
        fields = '__all__'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ['title', 'category', 'price', 'get_sizes_display', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['-created_at']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'category', 'description')
        }),
        ('Цена', {
            'fields': ('price',)
        }),
        ('Размеры', {
            'fields': ('sizes',),
            'description': 'Для обуви выберите размеры 36-46, для одежды - XS-XXXL'
        }),
        ('Фотографии', {
            'fields': ('image1', 'image2', 'image3')
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_sizes_display(self, obj):
        if obj.sizes:
            return ', '.join(obj.sizes)
        return '-'
    get_sizes_display.short_description = 'Размеры'


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_status', 'name', 'surname', 'phone', 'delivery_method', 'total', 'created_at']
    list_filter = ['approved', 'payment_method', 'delivery_region', 'delivery_method', 'created_at']
    search_fields = ['name', 'surname', 'phone', 'contact_id']
    readonly_fields = ['created_at', 'updated_at', 'items_display']
    ordering = ['-created_at']

    fieldsets = (
        ('Информация о покупателе', {
            'fields': ('name', 'surname', 'patronymic', 'phone', 'contact_method', 'contact_id')
        }),
        ('Информация о доставке', {
            'fields': ('delivery_region', 'delivery_method', 'delivery_address', 'europochta_branch')
        }),
        ('Информация о заказе', {
            'fields': ('items_display', 'total', 'payment_method')
        }),
        ('Статус', {
            'fields': ('approved',)
        }),
        ('Служебная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def items_display(self, obj):
        """Format items for display with sizes"""
        if not obj.items:
            return '-'
        
        items_html = '<ul style="list-style-type: none; padding: 0;">'
        for item in obj.items:
            name = item.get('name', 'Неизвестный товар')
            size = item.get('size', '-')
            quantity = item.get('quantity', 1)
            price = item.get('price', 0)
            total = float(price) * int(quantity)
            
            items_html += f'''
            <li style="padding: 8px; border-bottom: 1px solid #e0e0e0; margin-bottom: 4px;">
                <strong>{name}</strong><br>
                <span style="color: #666;">Размер: {size} | Кол-во: {quantity} | Цена: {price} BYN | Всего: {total} BYN</span>
            </li>
            '''
        items_html += '</ul>'
        
        from django.utils.safestring import mark_safe
        return mark_safe(items_html)
    
    items_display.short_description = "Товары"

    def order_status(self, obj):
        if obj.approved:
            return f"✓ Выполнено (#{obj.id})"
        else:
            return f"○ В ожидании (#{obj.id})"
    order_status.short_description = "Статус"

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

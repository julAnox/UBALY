from rest_framework import serializers
from .models import Product, Order


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'category', 'price', 'image1', 'image2', 'image3', 'description', 'sizes']
        read_only_fields = ['id']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'id',
            'name',
            'surname',
            'patronymic',
            'phone',
            'contact_method',
            'contact_id',
            'delivery_region',
            'delivery_method',
            'delivery_address',
            'europochta_branch',
            'payment_method',
            'items',
            'total',
            'approved',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_items(self, value):
        if not isinstance(value, list) or len(value) == 0:
            raise serializers.ValidationError("Items list cannot be empty")
        return value

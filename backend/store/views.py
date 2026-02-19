from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows viewing products.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get products filtered by category"""
        category = request.query_params.get('category')
        if category:
            queryset = self.queryset.filter(category=category)
        else:
            queryset = self.queryset
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint for creating and viewing orders.
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    http_method_names = ['post', 'get', 'head', 'options']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        order = serializer.save()

        self._send_order_email(order)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def _send_order_email(self, order):
        """Send order notification email"""
        try:
            items_text = "\n".join([
                f"- {item['name']} (размер: {item.get('size', 'N/A')}, кол-во: {item['quantity']}) — {item['price']} BYN"
                for item in order.items
            ])

            contact_display = f"{order.get_contact_method_display()}: {order.contact_id}" if order.contact_id else "—"
            
            delivery_text = f"{order.get_delivery_method_display()}"
            if order.delivery_address:
                delivery_text += f"\nАдрес: {order.delivery_address}"
            if order.europochta_branch:
                delivery_text += f"\nОтделение Европочты: {order.europochta_branch}"
            
            message = f"""
Новый заказ #{order.id}

ДАННЫЕ ПОКУПАТЕЛЯ:
Имя: {order.name}
Фамилия: {order.surname}
Отчество: {order.patronymic or '—'}
Телефон: {order.phone}
Способ связи: {contact_display}

ДОСТАВКА:
Регион: {order.get_delivery_region_display()}
Способ: {delivery_text}

СПОСОБ ОПЛАТЫ: {order.get_payment_method_display()}

ТОВАРЫ:
{items_text}

ИТОГО: {order.total} BYN

Дата заказа: {order.created_at.strftime('%d.%m.%Y %H:%M:%S')}
            """

            send_mail(
                subject=f'Новый заказ #{order.id} на сумму {order.total} BYN',
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ORDER_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error sending email: {e}")

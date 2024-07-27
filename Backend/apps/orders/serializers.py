from rest_framework import serializers
from .models import Orders



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Orders
        fields="__all__"
        
    def create(self, validate_data):
        orders= Orders.objects.create(**validate_data)
        return orders
        
class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Orders
        fields="__all__"
        
        
    
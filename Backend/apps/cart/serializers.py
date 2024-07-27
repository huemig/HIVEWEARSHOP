from rest_framework.fields import ImageField
from .models import Cart
from rest_framework import serializers
from apps.users.serializers import User_Serializer
from apps.products.serializers import Product_Serializer




class CartSerializer(serializers.ModelSerializer):
    product= Product_Serializer()
    class Meta:
        model=Cart
        fields='__all__'
        
    def validate(self, data):
        errors= {}
        if 'quantity' not in data or not data['quantity']:
            errors['quantity'] = ['quantity is required ']
        
        if 'product' not in data or not data['product']:
            errors['product'] = ['product is required ']
            
        if bool(errors):
            raise serializers.ValidationError(errors)
        return data
        
        
#
class CartListSerializer(serializers.ModelSerializer):
    product= Product_Serializer()
    class Meta:
        model=Cart
        fields='__all__'
        depth=1
#
        
        
class CartUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cart
        fields='__all__'
    def validate(self, data):
        errors= {}
        if 'quantity' not in data or not data['quantity']:
            errors['quantity'] = ['quantity is required ']
        
        if 'product' not in data or not data['product']:
            errors['product'] = ['product is required ']
        if bool(errors):
            raise serializers.ValidationError(errors)
        return data
        


        
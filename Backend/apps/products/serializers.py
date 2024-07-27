from.models import Products
from rest_framework import serializers
from cloudinary.models import CloudinaryField

class Product_Serializer(serializers.ModelSerializer):
    image=serializers.ImageField(read_only=True)
    class Meta:
        
        model=Products
        fields='__all__'
    
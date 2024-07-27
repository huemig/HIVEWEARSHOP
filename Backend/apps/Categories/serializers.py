from rest_framework.fields import ImageField
from .models import Categories
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    image=ImageField(read_only=True)
    class Meta:
        model=Categories
        fields='__all__'
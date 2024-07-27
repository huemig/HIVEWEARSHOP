from django.shortcuts import render
from rest_framework import generics, serializers, filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import Product_Serializer
from .models import Products

# Create your views here.


class Productlist(generics.ListAPIView):
    queryset= Products.objects.all()
    serializer_class= Product_Serializer
    filter_backends= [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields= ['gender'] 
    search_fields= ['name', 'description']
    



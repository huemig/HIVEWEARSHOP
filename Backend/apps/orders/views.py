from django.shortcuts import render
from rest_framework import generics
from .serializers import OrderListSerializer, OrderSerializer
from .models import Orders
# Create your views here.


class OrderList(generics.ListAPIView):
    queryset= Orders.objects.all()
    serializer_class= OrderListSerializer
    
class OrderAdd(generics.CreateAPIView):
    queryset= Orders.objects.all()
    serializer_class=OrderSerializer
    


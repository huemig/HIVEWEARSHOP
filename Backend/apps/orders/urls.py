from django.urls import path, include
from . import views

urlpatterns = [
    path('',views.OrderList.as_view(), name='orders' ),
    path('add/', views.OrderAdd.as_view(), name='order_add')
    
]
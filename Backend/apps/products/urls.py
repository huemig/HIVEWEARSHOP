
from django.urls import path
from . import views


urlpatterns = [
    path('', views.Productlist.as_view() , name= 'products')
]
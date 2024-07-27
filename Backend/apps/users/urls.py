from django.urls import path
from . import views



urlpatterns = [
    path('', views.UserList.as_view(), name='User'),
    path('signup/', views.UserSignUp.as_view(), name='user-signup'),
    path('signin/', views.UserSignin.as_view(), name='user-signin'),
]
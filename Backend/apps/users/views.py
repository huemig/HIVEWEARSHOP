from django.shortcuts import render
from rest_framework import generics
from .models import User
from rest_framework.response import Response
from .serializers import User_Serializer,User_Signup_Serializer, User_Signin_Serializer
from apps.users.mixins import CustomLoginRequiredMixin
# Create your views here.

class UserList(CustomLoginRequiredMixin, generics.ListAPIView):
    serializer_class=User_Serializer
    
    
    def get(self,request,*args,**kwargs):
        serializer = User_Serializer([request.login_user], many=True)
        return Response(serializer.data[0])
        





class UserSignUp(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = User_Signup_Serializer
    
class UserSignin(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = User_Signin_Serializer
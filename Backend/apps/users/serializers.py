from rest_framework import serializers
from .models import User

from django.contrib.auth.hashers import make_password,check_password
from secrets import token_hex
import datetime


class User_Serializer(serializers.ModelSerializer):
    class Meta:
        
        model=User
        fields='__all__'
        
        
class User_Signup_Serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields="__all__"
        
        
    def create(self, validate_data):
        if User.objects.filter(email=validate_data['email']).exists():
            raise serializers.ValidationError({'email':['This email already exists']})
        validate_data['password'] = make_password(validate_data['password'])
        validate_data['token'] = token_hex(30)
        ##
        validate_data['token_expires']= datetime.datetime.now()+datetime.timedelta(days=7)
        return super().create(validate_data)
        ##practice
    
    
class User_Signin_Serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields='__all__'
        
        
    def create(self, validate_data):
        user= User.objects.filter(email=validate_data['email'])
        if len(user)>0 and check_password(validate_data['password'],user[0].password):
            user[0].token=token_hex(30)
            user[0].token_expires= datetime.datetime.now()+datetime.timedelta(days=7)
            user[0].save()  
            return user[0]
        else:
            raise serializers.ValidationError({'error':"Either email or password is incorrect"})
        
    #user[0] valdat super()
    ####LOOKK INTO
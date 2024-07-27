from django.db import models


# Create your models here.

class User(models.Model):
    class Meta(object):
        db_table='User'
        
    name= models.CharField(max_length=12, blank=False, null=False)
    email= models.EmailField(blank=False, null=False, max_length=200)
    password=models.CharField(max_length=50, blank=False, null=False)
    token=models.CharField(blank=True, null=True, max_length=340)
    token_expires=models.DateTimeField(blank=True, null=True,)
    created_at=models.DateTimeField(auto_now_add=True, blank=True)
    updated_at=models.DateTimeField(auto_now=True, blank=True)
    
    def __str__(self):
        return self.email
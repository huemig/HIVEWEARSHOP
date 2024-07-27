from django.db import models
from cloudinary.models import CloudinaryField
from apps.users.models import User
from apps.products.models import Products

# Create your models here.

class Cart(models.Model):
    class Meta(object):
        db_table= 'cart'
        
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name= 'related_user')
    product= models.ForeignKey(Products ,on_delete=models.CASCADE, related_name='related_product')
    quantity = models.IntegerField('quantity', blank=False, null=False)
    
    def total_price(self):
        return self.quantity * self.product.price

    
    
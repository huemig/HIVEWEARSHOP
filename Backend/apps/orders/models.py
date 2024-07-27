from django.db import models
from apps.users.models import User

# Create your models here.



class Orders(models.Model):
    class Meta(object):
        db_table='Orders'
        
        
    user=models.ForeignKey(User, related_name='User_orders',on_delete=models.CASCADE)
    customer_name=models.CharField(max_length=50, blank=True)
    phone_number=models.CharField(max_length=12 ,blank=False, null=False)
    zip_code=models.IntegerField( blank=False)
    building=models.CharField(max_length=50, blank=False, null=False)
    city=models.CharField(max_length=50, blank=False)
    state=models.CharField(max_length=50, blank=False)
    total_quantity=models.IntegerField(blank=False,null=False)
    total_price=models.FloatField(blank=False, null=False)
    
   
from django.db import models
from cloudinary.models import CloudinaryField
# Create your models here.

class Categories(models.Model):
    class Meta(object):
        
        db_table='categories'
    name=models.CharField(max_length=50, blank=False)
    image=CloudinaryField(null=True, blank=True)
    created_at=models.DateTimeField(("created_at"), auto_now_add=True)
    updated_at=models.DateTimeField(("updated_at"), auto_now=True)
    def __str__(self):
        return self.name
    
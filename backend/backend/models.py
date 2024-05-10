from django.db import models

class User(models.Model):
    email = models.EmailField()
    password = models.CharField

    def __str__(self):
        return self.email 
    
    #http://127.0.0.1:8000/ server
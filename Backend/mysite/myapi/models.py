
from django.db import models

class User(models.Model):
	username=models.CharField(max_length=60)
	email = models.CharField(max_length=60)
	password = models.CharField(max_length=60)
	def __str__(self):
		return self.email
   
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import User
from django.contrib.auth import authenticate
from django.db.models import Q
from django.core.exceptions import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username','email', 'password')

class RegisterSerializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=60)
    password=serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username','email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            username=self.validated_data['username'],
            email=self.validated_data['email'], 
            password=self.validated_data['password']
            )
        # users=User.objects.filter(
        #     Q(email=user.email)
        #     ).distinct()
        # if users.exists():
        #     return("User with this email already exists")
        # if user.email == user.password:
        #     return("username and password should not be same")
        # if user.email == user.password:
        #     raise serializers.validationError(
        #         {'password': " user name and password should not be same"})
        # account.set_password(password)
        # user.password=password
        user.save()
        return user

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.CharField(max_length=60)
    password=serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    # @staticmethod
    def validate(self,data):
        user_obj=None
        email=data.get("email",None)
        password=data.get("password",None)

        # user = authenticate(email=email, password=password)
        user=User.objects.filter(

        	Q(email=email) 
        	).distinct()

        if user.exists() and user.count() ==1:
            user_obj=user.first()
            data={"status_code":201,"username":user_obj.username,"message":"user found"}
        else:
            data={"status_code":103,"message":"No user found with this email address"}
            return data
        if user_obj:
            if user_obj.password!=password:
                data={"status_code":104,"message":"Invalid password"}
                return data
        		# raise ValidationError("Incorrect password")
        return data
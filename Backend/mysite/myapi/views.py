from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.decorators import api_view
from .serializers import UserSerializer,RegisterSerializer,LoginSerializer
from .models import User
import jwt,json
from django.db.models import Q
from django.core.exceptions import *

# @api_view(['GET'])

class UserView(APIView):
    def get(self,request,*args,**kwargs):
        queryset = User.objects.all()
        return HttpResponse(queryset,"ok")


@api_view(['POST'])
def RegisterView(request):

    if request.method == "POST":
        print("register called")
        if(request.data['email']==request.data['password']):
            data={'status_code':101,"message":"Email and password should not be same"}
            return Response(data)
        users=User.objects.filter(
            Q(email=request.data['email'])
            ).distinct()
        if users.exists():
            data={"status_code":102,"message":"User with this email address already exists"}
            return Response(data)
        serializer = RegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "Succesfully registered a user"
            data['email'] = user.email
            data['password'] = user.password
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = serializer.errors
            return Response(data, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPIView(APIView):

    serializer_class = LoginSerializer

    def post(self,request,*args,**kwargs):
        email=request.data['email']
        password=request.data['password']
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.validate(request.data)
            print(new_data['status_code'])
            if(new_data['status_code']==201):
                payload={'email':email}
                jwt_token=jwt.encode(payload,"SECRET_TOKEN")
                rdata={
                        
                        'token':jwt_token,
                        'email':email,
                        'username':new_data['username'],
                        'message':"Succesfully logged in"
                }
                return Response(rdata)
            else:
                return Response(new_data)
        return Response(new_data, status=status.HTTP_400_BAD_REQUEST)


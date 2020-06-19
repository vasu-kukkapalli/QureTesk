from django.urls import include, path
from rest_framework import routers

from .views import UserView,RegisterView,UserLoginAPIView

# router = routers.DefaultRouter()
# router.register('users', UserView)
# router.register('register',RegisterView)
# # Wire up our API using automatic URL routing.
# # Additionally, we include login URLs for the browsable API.
# urlpatterns = [
#     path('', include(router.urls)),
#     path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
#     ]

urlpatterns = [
    path("register/", RegisterView, name="register"),
    path("view", UserView.as_view(),name="view"),
    path("login",UserLoginAPIView.as_view(),name="login")
]

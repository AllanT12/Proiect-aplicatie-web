from django.urls import path
from rest_framework.authtoken import views
from user.views import registration, update_profile, get_all_users

urlpatterns = [
    path('signin/', views.obtain_auth_token),
    path('register/', registration),
    path('update_profile/', update_profile),
    path('', get_all_users)
]

from django.urls import path
from .views import sport, delete_sport, update_sport

urlpatterns = [
    path('', sport),
    path('delete/<int:pk>/', delete_sport),
    path('update/<int:pk>/', update_sport),
]

from django.urls import path
from . import views

urlpatterns = [
    path('', views.events_list),
    path('delete/<int:pk>/', views.delete_event),
]

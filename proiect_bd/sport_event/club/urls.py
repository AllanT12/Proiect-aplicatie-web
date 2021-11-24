from django.urls import path
from club.views import join_club, get_clubs_and_create, Show_Requests, Accept_Or_Deny, Show_Members, delete_club

urlpatterns = [
    path('join/<int:pk>/', join_club),
    path('', get_clubs_and_create),
    path('requests/', Show_Requests),
    path('update/<int:pk>/', Accept_Or_Deny),
    path('members/', Show_Members),
    path('delete/', delete_club),
]

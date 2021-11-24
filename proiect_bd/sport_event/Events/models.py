from django.db import models
from sport.models import Sports
from club.models import Clubs


class Events(models.Model):
    club = models.ForeignKey(Clubs, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=50)
    location = models.CharField(max_length=30)
    sport = models.ForeignKey(Sports, on_delete=models.CASCADE)
    Date = models.DateField(auto_now_add=False)
    Time = models.TimeField(auto_now_add=False)


# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models import SET_NULL
from django.db.models.signals import post_save
from django.dispatch import receiver
from sport.models import Sports
from rest_framework.authtoken.models import Token


class Users(AbstractUser):
    username = None
    ADMIN = 0
    COACH = 1
    ATHLETE = 2
    ROLES = (
        (ADMIN, "ADMIN"),
        (COACH, "COACH"),
        (ATHLETE, "ATHLETE"),
    )
    MALE = 0
    FEMALE = 1
    GENDER = (
        (MALE, "MALE"),
        (FEMALE, "FEMALE"),
    )
    gender = models.IntegerField(default=MALE, choices=GENDER)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    password = models.CharField(max_length=100)
    role = models.IntegerField(default=ATHLETE, choices=ROLES)
    height = models.DecimalField(decimal_places=1, max_digits=5, blank=True, null=True)
    weight = models.DecimalField(decimal_places=1, max_digits=5, blank=True, null=True)
    BirthDate = models.DateField(auto_now_add=False)
    primary_sport = models.ForeignKey(Sports, on_delete=SET_NULL, null=True, related_name="primary")
    secondary_sport = models.ForeignKey(Sports, on_delete=SET_NULL, null=True, related_name="secondary")
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.first_name + self.last_name


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
# Create your models here.

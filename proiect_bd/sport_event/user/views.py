from django.core.mail import BadHeaderError, send_mail
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Users
from sport_event.settings import EMAIL_HOST_USER
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.response import Response
import random
import string
# Create your views here.
from .serializers import EmailSerializer
from .serializers import UsersSerializer


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def registration(request):
    serializer = UsersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        db_password = make_password(serializer.data.get("password"))
        Users.objects.filter(email=serializer.data.get("email")).update(password=db_password)
        return Response(status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=300)


@csrf_exempt
@api_view(["PATCH"])
@permission_classes((IsAuthenticated,))
def update_profile(request):
    token = request.auth
    athlete = Users.objects.get(id=token.user_id)
    serializer = UsersSerializer(athlete, many=False)
    serializer.update(serializer.instance, request.data)
    return Response(status=status.HTTP_200_OK)


@csrf_exempt
@api_view(["GET"])
@permission_classes((AllowAny,))
def get_all_users(request):
    users = Users.objects.all()
    serializaer = UsersSerializer(users, many=True)
    return Response(serializaer.data)


def get_random_string(length):
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str
# Create your views here.

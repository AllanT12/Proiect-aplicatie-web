from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from user.models import Users
from .models import Clubs, ClubUserStatus
from .serializers import ClubSerializer, CClubSerializer, ClubStatusSerializer, CClubStatusSerializer
from rest_framework import permissions, status
from rest_framework.decorators import api_view, permission_classes
from Events.models import Events

@api_view(['POST'])
@permission_classes((permissions.IsAuthenticated,))
def join_club(request, pk):
    token = request.auth
    id = token.user_id
    club = Clubs.objects.get(id=pk)
    user = Users.objects.get(id=id)
    ClubUserStatus.objects.create(user_id=user, status=ClubUserStatus.REQUEST, club_id=club)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
@permission_classes((permissions.IsAuthenticated,))
def get_clubs_and_create(request):
    if request.method == "GET":
        clubs = Clubs.objects.all()
        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)
    if request.method == "POST":
        token = request.auth
        id = token.user_id
        user = Users.objects.get(id=id)
        serializer = CClubSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if Clubs.objects.filter(name=request.data.get("name")).exists():
            return Response(status=status.HTTP_302_FOUND)
        if Clubs.objects.filter(owner=id).exists():
            return JsonResponse(serializer.data, status=300)
        serializer.save()
        clubs = Clubs.objects.get(name=request.data.get("name"))
        clubs.owner = user
        clubs.save()
        return Response(status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def Show_Requests(request):
    if request.method == "GET":
        token = request.auth
        id = token.user_id
        user = Users.objects.get(id=id)
        club = Clubs.objects.get(owner=user)
        req = ClubUserStatus.objects.filter(club_id=club, status=0)
        serializer = ClubStatusSerializer(req, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def Show_Members(request):
    if request.method == "GET":
        token = request.auth
        id = token.user_id
        user = Users.objects.get(id=id)
        club = Clubs.objects.get(owner=user)
        req = ClubUserStatus.objects.filter(club_id=club, status=1)
        serializer = ClubStatusSerializer(req, many=True)
        return Response(serializer.data)


@api_view(['PATCH'])
@permission_classes((permissions.AllowAny,))
def Accept_Or_Deny(request, pk):
    club = ClubUserStatus.objects.get(id=pk)
    serial = CClubStatusSerializer(club, many=False)
    serial.update(serial.instance, request.data)
    return Response(status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def delete_club(request):
    token = request.auth
    id = token.user_id
    user = Users.objects.get(id=id)
    club = Clubs.objects.get(owner=user)
    req = ClubUserStatus.objects.get(club_id=club)
    event = Events.objects.get(club=club)
    req.delete()
    event.delete()
    club.delete()
    return Response(status=status.HTTP_200_OK)
# Create your views here.

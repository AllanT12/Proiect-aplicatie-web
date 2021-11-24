from django.core.paginator import Paginator
from django.shortcuts import render
from .models import Events
from user.models import Users
from Events.serializers import EventsSerializer, EEventsSerializer
from user.serializers import UsersSerializer
from rest_framework import permissions, status
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def events_list(request):
    if request.method == 'GET':
        events = Events.objects.all()
        serializer = EEventsSerializer(events, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes((permissions.IsAuthenticated,))
def delete_event(request, pk):
    events = Events.objects.filter(id=pk)
    events.delete()
    return JsonResponse({}, status=200)

# Create your views here.

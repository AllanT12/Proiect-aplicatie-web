from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from sport.models import Sports
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from sport.serializers import SportSerializer


@csrf_exempt
@api_view(["GET", "POST"])
@permission_classes((AllowAny,))
def sport(request):
    if request.method == "GET":
        sports = Sports.objects.all()
        serializer = SportSerializer(sports, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = SportSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
@api_view(["DELETE"])
@permission_classes((IsAuthenticated,))
def delete_sport(request, pk):
    sports = Sports.objects.filter(id=pk)
    sports.delete()
    return JsonResponse({}, status=200)


@csrf_exempt
@api_view(["PATCH"])
@permission_classes((IsAuthenticated,))
def update_sport(request, pk):
    sports = Sports.objects.get(id=pk)
    serializer = SportSerializer(sports, many=False)
    serializer.update(serializer.instance, request.data)
    return Response(status=status.HTTP_200_OK)

# Create your views here.

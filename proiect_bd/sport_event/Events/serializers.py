from rest_framework import serializers
from .models import Events
from club.serializers import CClubSerializer


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'


    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.location = validated_data.get('location', instance.location)
        instance.save()
        return instance


class EEventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        fields = '__all__'
    club = CClubSerializer(many=False)

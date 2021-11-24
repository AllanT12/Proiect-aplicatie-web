from rest_framework import serializers
from .models import Sports


class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sports
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.type = validated_data.get('type', instance.type)
        instance.save()
        return instance

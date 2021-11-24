from rest_framework import serializers
from .models import Clubs, ClubUserStatus
from user.models import Users


class UserSer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['first_name', 'last_name']


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'
    owner = UserSer(many=False)


class CClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clubs
        fields = '__all__'


class ClubStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubUserStatus
        fields = '__all__'
    user_id = UserSer(many=False)
    club_id = CClubSerializer(many=False)


class CClubStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubUserStatus
        fields = '__all__'

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

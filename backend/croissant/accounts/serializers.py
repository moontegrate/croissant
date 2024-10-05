from rest_framework import serializers
from .models import Account

class AccountSerializer(serializers.ModelSerializer):
    createdDate = serializers.CharField(source='created_date')

    class Meta:
        model = Account
        fields = ['id', 'name', 'createdDate', 'img']
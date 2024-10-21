from rest_framework import serializers
from .models import Automation, Group
from accounts.serializers import AccountSerializer

class AutomationSerializer(serializers.ModelSerializer):
    createdDate = serializers.CharField(source='created_date', read_only=True)
    accountName = serializers.SerializerMethodField()

    class Meta:
        model = Automation
        fields = ['id', 'name', 'createdDate', 'account', 'accountName', 'users', 'conversion', 'channel', 'enabled', 'group']

    def get_accountName(self, obj):
        return obj.account.name
    
    def create(self, validated_data):
        account = validated_data.get('account')  # Используем account
        automation = Automation.objects.create(**validated_data)
        return automation
    

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']
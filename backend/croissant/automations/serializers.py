from rest_framework import serializers
from .models import Automation, Node, Group

class AutomationSerializer(serializers.ModelSerializer):
    createdDate = serializers.CharField(source='created_date')
    accountName = serializers.SerializerMethodField()

    class Meta:
        model = Automation
        fields = ['id', 'name', 'createdDate', 'account', 'accountName', 'users', 'conversion', 'channel', 'enabled', 'group']

    def get_accountName(self, obj):
        return obj.account.name
    

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']
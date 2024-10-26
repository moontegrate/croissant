from rest_framework import serializers
from .models import Automation, Group, Node
from accounts.serializers import AccountSerializer

class AutomationSerializer(serializers.ModelSerializer):
    createdDate = serializers.CharField(source='created_date', read_only=True)
    accountName = serializers.SerializerMethodField()
    accountIcon = serializers.SerializerMethodField()

    class Meta:
        model = Automation
        fields = ['id', 'name', 'createdDate', 'account', 'accountName', 'accountIcon', 'users', 'conversion', 'channel', 'enabled', 'group']

    def get_accountName(self, obj):
        return obj.account.name
    
    def get_accountIcon(self, obj):
        return obj.account.img
    
    def create(self, validated_data):
        account = validated_data.get('account')
        automation = Automation.objects.create(**validated_data)
        return automation
    

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class NodeSerializer(serializers.ModelSerializer):
    # createdDate = serializers.CharField(source='created_date', read_only=True)
    # zIndex = serializers.SerializerMethodField()
    # isEntryPoint = serializers.SerializerMethodField()
    # isBinded = serializers.SerializerMethodField()
    # bindedTo = serializers.SerializerMethodField()

    class Meta:
        model = Node
        fields = '__all__'
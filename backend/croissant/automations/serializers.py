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
    createdDate = serializers.CharField(source='created_date', read_only=True)
    isEntryPoint = serializers.BooleanField(source='is_entry_point')
    isBinded = serializers.BooleanField(source='is_binded')
    bindedTo = serializers.UUIDField(source='binded_to', required=False, allow_null=True)
    noteContent = serializers.CharField(source='note_content', required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Node
        fields = [
            'id',
            'createdDate',
            'automation',
            'type',
            'x',
            'y',
            'isEntryPoint',
            'isBinded',
            'bindedTo',
            'noteContent',
            'text'
        ]
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import AutomationSerializer, GroupSerializer, NodeSerializer
from .models import Automation, Group, Node

class AutomationViewSet(viewsets.ModelViewSet):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        automation_name = data.get('automationName')
        selected_account = data.get('selectedAccount')

        if not automation_name:
            return Response({"name": ["This field may not be null."]}, status=status.HTTP_400_BAD_REQUEST)

        if not selected_account or not selected_account.get('id'):
            return Response({"account": ["This field may not be null."]}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={
            'name': automation_name,
            'account': selected_account['id']
        })

        serializer.is_valid(raise_exception=True)
        automation = serializer.save()

        Node.objects.create(
            automation=automation,
            type='Message',
            x=0,
            y=0,
            z_index=0,
            is_entry_point=True,
            is_binded=False,
            binded_to=None
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data

        automation_name = data.get('name')

        if not automation_name:
            return Response({"name": ["This field may not be null."]}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(instance, data={
            'name': automation_name,
            'account': data.get('account', instance.account),
            'users': data.get('users', instance.users),
            'conversion': data.get('conversion', instance.conversion),
            'channel': data.get('channel', instance.channel),
            'enabled': data.get('enabled', instance.enabled),
            'group': data.get('group', instance.group)
        }, partial=False)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer

    def get_queryset(self):
        automation_id = self.request.query_params.get('automation')
        
        if automation_id:
            return Node.objects.filter(automation__id=automation_id)
        
        return super().get_queryset()
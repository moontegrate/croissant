from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import AutomationSerializer, GroupSerializer
from .models import Automation, Group

class AutomationViewSet(viewsets.ModelViewSet):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer

    def create(self, request, *args, **kwargs):
        data = request.data
        automation_name = data.get('automationName')
        selected_account = data.get('selectedAccount')

        print(data)

        if not automation_name:
            return Response({"name": ["This field may not be null."]}, status=status.HTTP_400_BAD_REQUEST)

        if not selected_account or not selected_account.get('id'):
            return Response({"account": ["This field may not be null."]}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={
            'name': automation_name,
            'account': selected_account['id']
        })

        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AutomationSerializer, GroupSerializer
from .models import Automation, Group

class AutomationViewSet(viewsets.ModelViewSet):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

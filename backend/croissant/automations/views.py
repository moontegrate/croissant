from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AutomationSerializer
from .models import Automation

class AutomationViewSet(viewsets.ModelViewSet):
    queryset = Automation.objects.all()
    serializer_class = AutomationSerializer

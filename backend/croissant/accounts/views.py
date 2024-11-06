from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AccountSerializer
from .models import Account
from rest_framework.permissions import IsAuthenticated
from users.permissions import IsAuthorOrAdmin

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrAdmin]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Account.objects.all()
        return Account.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
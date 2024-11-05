from django.db import models
from django.conf import settings
import uuid

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    img = models.CharField(blank=True, null=True)
    channel = models.CharField(max_length=10, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='account_author')

    def __str__(self):
        return f"@{self.name}"
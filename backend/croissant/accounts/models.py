from django.db import models
import uuid

class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    img = models.CharField(blank=True, null=True)
    channel = models.CharField(max_length=10, null=True)

    def __str__(self):
        return f"@{self.name}"
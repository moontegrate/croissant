from django.db import models
import uuid

class Automation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE)
    users = models.IntegerField(default=0)
    conversion = models.FloatField(default=0)
    channel = models.CharField(max_length=10, default='')
    enabled = models.BooleanField(default=True)
    group = models.ForeignKey('Group', on_delete=models.SET_NULL, null=True, blank=True, related_name='automations')

    def __str__(self):
        return f"Automation - {self.name}"

class Node(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=10)
    x = models.IntegerField()
    y = models.IntegerField()
    z_index = models.IntegerField()
    is_entry_point = models.BooleanField()
    is_binded = models.BooleanField()
    binded_to = models.ForeignKey(Automation, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.type} - {self.id}"
    

class Group(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"Group - {self.name}"
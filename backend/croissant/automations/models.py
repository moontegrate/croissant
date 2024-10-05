from django.db import models

class Automation(models.Model):
    name = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE)
    users = models.IntegerField(default=0)
    conversion = models.FloatField(default=0)
    channel = models.CharField(max_length=10, default='')
    enabled = models.BooleanField(default=True)
    group = models.CharField(max_length=255, default='')

    def __str__(self):
        return f"Automation - {self.name}"

class Node(models.Model):
    type = models.CharField(max_length=10)
    x = models.IntegerField()
    y = models.IntegerField()
    z_index = models.IntegerField()
    is_entry_point = models.BooleanField()
    is_binded = models.BooleanField()
    binded_to = models.ForeignKey(Automation, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.type} - {self.id}"
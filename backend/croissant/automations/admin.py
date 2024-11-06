from django.contrib import admin
from automations.models import Automation, Group, Node

admin.site.register(Automation)
admin.site.register(Group)
admin.site.register(Node)

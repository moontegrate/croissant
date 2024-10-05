from rest_framework import serializers

class AutomationSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
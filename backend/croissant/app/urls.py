"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from automations.views import AutomationViewSet, GroupViewSet, NodeViewSet
from accounts.views import AccountViewSet
from oauth2_provider import urls as oauth2_urls

router = DefaultRouter()
router.register(r'automations', AutomationViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'automations-groups', GroupViewSet)
router.register(r'nodes', NodeViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('o/', include(oauth2_urls)),
]

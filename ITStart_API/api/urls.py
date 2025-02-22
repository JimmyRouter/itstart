from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeminarViewSet

router = DefaultRouter()
router.register(r'seminars', SeminarViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
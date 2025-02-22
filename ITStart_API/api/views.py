from rest_framework import viewsets
from .models import Seminar
from .serializers import SeminarSerializer


class SeminarViewSet(viewsets.ModelViewSet):
    queryset = Seminar.objects.all()
    serializer_class = SeminarSerializer

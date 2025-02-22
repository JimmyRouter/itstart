from django.db import models


class Seminar(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    photo = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title
from django.db import models
from datetime import datetime

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField('Название события', max_length=100)
    content = models.TextField('Содержание проекта', blank=True)
    eventDate = models.DateTimeField('Дата события')
    done = models.BooleanField('Выполнено', default=False, blank=True)
    creation_date = models.DateTimeField('Дата создания проекта', auto_now_add=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'
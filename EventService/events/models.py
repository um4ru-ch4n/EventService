from django.db import models
from datetime import datetime
from django.contrib.auth.models import User

class Event(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField('Название события', max_length=100)
    content = models.TextField('Текст события', blank=True)
    eventDate = models.DateTimeField('Дата события')
    done = models.BooleanField('Выполнено', default=False, blank=True)
    creation_date = models.DateTimeField('Дата создания проекта', auto_now_add=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'
import sys
sys.path.append('../')

from events.models import Event
from django.contrib.auth.models import User
from datetime import datetime
import pytz

def checkDate():
    emails = []
    for event in Event.objects.all():
        if not event.done and (event.eventDate - datetime.now(tz=pytz.timezone('Europe/Moscow'))).seconds/60/60 <= 1:
            emails.append({
                "title": event.title,
                "content": event.content,
                "eventDate": event.eventDate,
                "email": event.user.email
            })
            dEv = Event.objects.get(id=event.id)
            dEv.done = True
            dEv.save()

    return emails
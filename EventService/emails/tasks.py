from celery.task.schedules import crontab
from celery.decorators import periodic_task
from celery.utils.log import get_task_logger
from django.core.mail import send_mail
from django.conf import settings

from .utils import checkDate

logger = get_task_logger(__name__)


@periodic_task(
    run_every=(crontab(minute='*/1')),
    name="sendMails",
    ignore_result=True
)
def sendMails():
    emails = checkDate()
    for letter in emails:
        text = f"Скоро начнется событие!\n\nДата события: {letter['eventDate']}\n\nТекст события: {letter['content']}"
        send_mail(letter['title'], text, settings.EMAIL_HOST_USER, [letter['email']])
    
    logger.info("Sent an email")
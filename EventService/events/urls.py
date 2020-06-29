from django.urls import path, include
from . import api

from rest_framework import routers

router = routers.DefaultRouter()
router.register('api/events', api.EventView)

urlpatterns = [
    path('', include(router.urls)),
    path('api/create_event', api.CreateEventAPI.as_view()),
    path('api/update_event', api.UpdateEventAPI.as_view()),
    path('api/delete_event', api.DeleteEventAPI.as_view()),
]
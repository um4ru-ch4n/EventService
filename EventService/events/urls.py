from django.urls import path, include
from . import api

urlpatterns = [
    path('api/create_event', api.CreateEventAPI.as_view()),
    path('api/update_event', api.UpdateEventAPI.as_view()),
    path('api/delete_event', api.DeleteEventAPI.as_view()),
    path('api/events', api.EventView.as_view()),
]
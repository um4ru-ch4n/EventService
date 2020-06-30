from rest_framework import generics, permissions, viewsets, status
from rest_framework.response import Response

from .serializers import EventSerializer
from .models import Event


class CreateEventAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        data["user"] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        event = serializer.save()

        return Response({
            "event": EventSerializer(event, context=self.get_serializer_context()).data,
        })


class UpdateEventAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EventSerializer

    def post(self, request, *args, **kwargs):
        try:
            instance = Event.objects.get(id=request.data["id"])
        except Exception as e:
            return Response(e.args)

        event = self.get_serializer(instance=instance, data=request.data)
        event.is_valid(raise_exception=True)
        event.save()

        return Response({
            "event": event.data,
        })


class DeleteEventAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EventSerializer

    def delete(self, request, *args, **kwargs):
        try:
            event = Event.objects.get(id=request.data["id"])
        except Exception as e:
            return Response(e.args)

        event.delete()
        return Response(data={
            "The event was successfully deleted."
        }, status=status.HTTP_200_OK)


class EventView(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = EventSerializer

    def get(self, request, *args, **kwargs):
        events = list(map(lambda event: EventSerializer(
            event, context=self.get_serializer_context()).data, Event.objects.filter(user=request.user.id)))
        return Response({
            "events": events,
        })

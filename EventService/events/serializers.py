from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

        extra_kwargs = {
            'content': 
            {
                'required': False
            }, 
            'done': 
            {
                'required': False
            }
        }
    
    def create(self, validated_data):
        event = Event.objects.create(**validated_data)
        return event

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.eventDate = validated_data.get('eventDate', instance.eventDate)
        instance.done = validated_data.get('done', instance.done)
        instance.save()
        return instance
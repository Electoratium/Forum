from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from .models import *

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']
        self.room_group_name = 'chat'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        text_data_json = json.loads(text_data)


        message = text_data_json['message']


        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):
        message = event['message']

        user_name = message['user_name']
        message_text = message['message_text']
        message['date_time'] = str(datetime.now())

        # create new comments/posts
        if(message.get('post_id')):
            Commentaries.objects.create(
                user_name=user_name,
                comment_text=message_text,
                post_id = message['post_id']
            )
        else:
            created_post = Messages.objects.create(
                user_name = user_name,
                message_text=message_text
            )
            message['created_id'] = created_post.pk


        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
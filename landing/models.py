from django.db import models
from datetime import datetime

# Create your models here.
class Messages(models.Model):
    user_name = models.CharField(blank=False, max_length=128)
    message_text = models.CharField(blank=False, max_length=1000)
    post_date = models.DateTimeField(auto_created=True, default=datetime.now(), blank=True)

    def __str__(self):
        return 'Post № {0} user: {1} '.format(self.pk, self.user_name)

    class Meta:
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'


class Commentaries(models.Model):
    user_name = models.CharField(blank=False, max_length=128)
    comment_text = models.CharField(blank=False, max_length=800)
    post = models.ForeignKey(Messages, on_delete=models.CASCADE, null=True)
    comment_date = models.DateTimeField(auto_created=True,default=datetime.now(), blank=True)

    def __str__(self):
        return 'Post № {0} user: {1} '.format(self.pk, self.user_name)

    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'
from django.contrib import admin
from .models import *

from django import forms

class Commens(admin.ModelAdmin):
    list_display = [field.name for field in Messages._meta.fields]
    search_fields = ['user_name', 'post_date']

    class Meta:
        model = Messages

admin.site.register(Messages, Commens)

class Inner_comments(admin.ModelAdmin):
    list_display = [field.name for field in Commentaries._meta.fields]
    search_fields = ['user_name', 'comment_date']


    class Meta:
        model = Commentaries

admin.site.register(Commentaries, Inner_comments)
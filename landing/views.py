from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.contrib.auth import logout as auth_logout


from .models import *

# def register(request):
#     return render(request, 'register.html')


# @login_required
def forum(request):

    msg = Messages.objects.all()
    comments = Commentaries.objects.all()

    return render(request, 'forum.html', {'messages': msg, 'comments': comments})

def logout(request):
    """Logs out user"""
    auth_logout(request)
    return HttpResponseRedirect('/')
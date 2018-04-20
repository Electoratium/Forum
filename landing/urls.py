from django.conf.urls import url, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # url(r'^', views.register, name='register'),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^oauth/', include('social_django.urls', namespace='social')),
    url(r'^', views.forum, name='forum'),
]
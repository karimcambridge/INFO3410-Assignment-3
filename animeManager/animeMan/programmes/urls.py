from django.urls import path
from django.conf.urls import url, include
from .views import list_programmes, add_programmes

urlpatterns = [
    path('', list_programmes),
    path('list', list_programmes),
    path('list.html', list_programmes),
    path('add', add_programmes),
    path('add.html', add_programmes),
]
from django.urls import path
from .views import list_programmes, add_programmes, RecordView

urlpatterns = [
    path('', list_programmes),
    path('add', add_programmes),
    path('add.html', add_programmes),
    path('records', RecordView.as_view())
]
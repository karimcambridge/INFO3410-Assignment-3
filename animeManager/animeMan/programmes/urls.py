from django.urls import path
from .views import list_programmes, RecordView

urlpatterns = [
    path('', list_programmes),
    path('records', RecordView.as_view())
]
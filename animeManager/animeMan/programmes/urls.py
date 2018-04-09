from django.urls import path
from .views import listProgrammes, RecordView

urlpatterns = [
    path('', listProgrammes),
    path('records', RecordView.as_view())
]
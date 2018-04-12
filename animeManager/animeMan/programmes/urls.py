from django.urls import path
from django.conf.urls import url, include
from .views import list_programmes, add_programmes, detail_view
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', list_programmes),
    path('list', list_programmes),
    path('list.html', list_programmes),
    path('add', add_programmes),
    path('add.html', add_programmes),
    path('details', detail_view, name='detail_view'),
    path('details/<int:id>', detail_view),
    path('details.html/<int:id>', detail_view),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from django import forms
from django.db import models
from django.forms import ModelForm
from .anime import Anime

class AnimeForm(ModelForm):
    class Meta:
        model = Anime 
        exclude = ()

class CSVFileUploadForm(forms.Form):
    file = forms.FileField()
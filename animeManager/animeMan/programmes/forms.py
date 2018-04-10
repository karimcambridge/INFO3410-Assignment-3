from django import forms
from django.db import models
from django.forms import ModelForm
from .models import Programme

class ProgrammeForm(ModelForm):
    class Meta:
        model = Programme
        exclude = ()

class CSVFileUploadForm(forms.Form):
    file = forms.FileField()
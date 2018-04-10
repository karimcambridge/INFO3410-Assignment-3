from django.forms import ModelForm
from .models import Programme

class ProgrammeForm(ModelForm):
    class Meta:
        model = Programme
        exclude = ()
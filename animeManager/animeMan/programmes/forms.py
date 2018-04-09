from django.forms import ModelForm
from .models import Programmes

class ProgrammeForm(ModelForm):
    class Meta:
        model = Programmes
        exclude = ()
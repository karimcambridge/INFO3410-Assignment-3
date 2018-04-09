from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from .models import Programmes
from .forms import ProgrammeForm

# Create your views here.
def listProgrammes(request):
    allProgrammes = Programmes.objects.all()
    return render(request, 'animes/list.html', {
        'animes': allProgrammes
    })

class RecordView(View):
    def get(self, request):
        progForm = ProgrammeForm()
        return render(request, 'animes/add.html', {
            'form': progForm
        })
    
    def post(self, request):
        progForm = ProgrammeForm(request.POST, request.FILES)
        if progForm.is_valid():
            progForm.save()
            return HttpResponseRedirect("/")
        
        return render(request, 'animes/add.html', {
            'form': progForm
        })


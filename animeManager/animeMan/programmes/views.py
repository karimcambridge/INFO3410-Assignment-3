from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from .models import Programmes
from .forms import ProgrammeForm

# Create your views here.
def list_programmes(request):
    """ Lists all programmes on the main page """
    programmes_dict = Programmes.objects.all()
    return render(request, 'animes/list.html', {
        'animes': programmes_dict
    })

class RecordView(View):
    """ Record view class """
    def get(self, request):
        """ Record view get Mutator """
        programme_form = ProgrammeForm()
        return render(request, 'animes/add.html', {
            'form': programme_form
        })

    def post(self, request):
        """ Record view post """
        programme_form = ProgrammeForm(request.POST, request.FILES)
        if programme_form.is_valid():
            programme_form.save()
            return HttpResponseRedirect("/")

        return render(request, 'animes/add.html', {
            'form': programme_form
        })

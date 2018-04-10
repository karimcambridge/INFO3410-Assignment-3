from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from .models import Programme
from .forms import ProgrammeForm, CSVFileUploadForm

# Create your views here.

#def load_programmes(request):
#    """ Lists all programmes on the main page """
#    anime_csv_list = ProgrammesCsvModel.import_data(data = open("my_csv_file_name.csv"))
#    first_line = anime_csv_list[0]
#    return render(request, 'animes/list.html', {
#        'animes': programmes_dict
#    })

def list_programmes(request):
    """ Lists all programmes on the main page """
    programmes_dict = Programme.objects.all()
    return render(request, 'animes/list.html', {
        'animes': programmes_dict,
        'CSVFileUploadForm': CSVFileUploadForm,
        'ProgrammeForm': ProgrammeForm
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

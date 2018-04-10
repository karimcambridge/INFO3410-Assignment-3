from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from .models import Programme
from .forms import ProgrammeForm, CSVFileUploadForm
from django.contrib import messages
import csv
import codecs

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
    if request.method == "GET":
        return render(request, 'animes/list.html', {
            'animes': programmes_dict,
            'CSVFileUploadForm': CSVFileUploadForm,
            'ProgrammeForm': ProgrammeForm
        })

    csv_file = request.FILES["file"]
    if not csv_file.name.endswith('.csv'):
        messages.error(request,'File is not CSV type')
        return HttpResponseRedirect(reverse("programmes:list"))
    #if file is too large, return
    if csv_file.multiple_chunks():
        messages.error(request,"Uploaded file is too big (%.2f MB)." % (csv_file.size / (1000 * 1000),))
        return HttpResponseRedirect(reverse("programmes:list"))

    file_data = csv_file.read().decode("utf-8")        

    lines = file_data.split("\n")
    #loop over the lines and save them in db. If error, store as string and then display
    for line in lines:                        
        fields = line.split(",")
        data_dict = {}
        data_dict["name"] = fields[0]
        data_dict["start_date_time"] = fields[1]
        data_dict["end_date_time"] = fields[2]
        data_dict["notes"] = fields[3]

        form = CSVFileUploadForm(fields) # CSVFileUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()

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

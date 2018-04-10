from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from .models import Programme
from .forms import ProgrammeForm, CSVFileUploadForm
from django.contrib import messages
import csv
import codecs
import logging

logger = logging.getLogger(__name__)

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

def add_programmes(request):
    """ Lists all programmes on the main page """
    print(request.method)  
    if request.method == "GET":
        return render(request, 'animes/add.html', {
            'CSVFileUploadForm': CSVFileUploadForm,
            'ProgrammeForm': ProgrammeForm
        })
    else:
        csv_file = request.FILES["file"]
        if not csv_file.name.endswith('.csv'):
            messages.error(request,'File is not CSV type')
            return HttpResponseRedirect(reverse("programmes:list"))
        #if file is too large, return
        if csv_file.multiple_chunks():
            messages.error(request,"Uploaded file is too big (%.2f MB)." % (csv_file.size / (1000 * 1000),))
            return HttpResponseRedirect(reverse("programmes:list"))

        file_data = csv_file.read().decode("utf-8")    

        #print("The value of file_data is %s", file_data)    

        lines = file_data.split("\n")
        #loop over the lines and save them in db. If error, store as string and then display
        for line in lines:

            print("The value of line is ", line)  
            fields = line.split(",")
            data_dict = {}
            #data_dict["anime_id"] = fields[0]
            #data_dict["name"] = fields[1]
            #data_dict["genre"] = fields[2]
            #data_dict["types"] = fields[3]
            #data_dict["episodes"] = fields[4]
            #data_dict["rating"] = fields[5]
            #data_dict["members"] = fields[6]

            form = ProgrammeForm(data_dict) # CSVFileUploadForm(request.POST, request.FILES)
            if form.is_valid():
                form.save()

        return render(request, 'animes/add.html', {
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

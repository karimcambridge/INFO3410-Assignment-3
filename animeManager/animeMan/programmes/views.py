from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.views import View
from .models import Programme
from .forms import ProgrammeForm, CSVFileUploadForm
from django.contrib import messages
import csv
from io import StringIO

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
        file = request.FILES["file"]

        file.open('r')
        csv_file = StringIO(file.read().decode('iso-8859-1'))
        parsed_data = csv.DictReader(csv_file, delimiter=';', quotechar='\"', escapechar='\\')

        #if not csv_file.name.endswith('.csv'):
        #    messages.error(request,'File is not CSV type')
        #    return HttpResponseRedirect(reverse("programmes:list"))
        ##if file is too large, return
        #if csv_file.multiple_chunks():
        #    messages.error(request,"Uploaded file is too big (%.2f MB)." % (csv_file.size / (1000 * 1000),))
        #    return HttpResponseRedirect(reverse("programmes:list"))

        print("showing data parsed from csv file")
        print(parsed_data)
        print("moving on")

        for line in parsed_data:

            if len(line) > 0:

                print("line is ", line)
#
                form = ProgrammeForm(line) # CSVFileUploadForm(request.POST, request.FILES)
                if form.is_valid():
                    form.save()

        return render(request, 'animes/list.html')

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

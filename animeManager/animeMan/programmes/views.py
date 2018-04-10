from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect 
from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserSerializer
from django.views import View
from .anime import Anime 
from .forms import AnimeForm, CSVFileUploadForm
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
    animes_dict = Anime.objects.all()
    return render(request, 'animes/list.html', {
            'animes': animes_dict,
            'CSVFileUploadForm': CSVFileUploadForm,
            'AnimeForm': AnimeForm
        })

def add_programmes(request):
    """ Lists all programmes on the main page """
    print(request.method)  
    if request.method == "GET":
        return render(request, 'animes/add.html', {
            'CSVFileUploadForm': CSVFileUploadForm,
            'AnimeForm': AnimeForm
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

                form = AnimeForm(line) # CSVFileUploadForm(request.POST, request.FILES)
                if form.is_valid():
                    form.save()

        return render(request, 'animes/list.html')


class RecordView(View):
    """ Record view class """
    def get(self, request):
        """ Record view get Mutator """
        anime_form = AnimeForm()
        return render(request, 'animes/add.html', {
            'form': anime_form
        })

    def post(self, request):
        """ Record view post """
        anime_form = AnimeForm(request.POST, request.FILES)
        if anime_form.is_valid():
            anime_form.save()
            return HttpResponseRedirect("/")

        return render(request, 'animes/add.html', {
            'form': anime_form
        })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
    return render(request, 'animes/list.html', { 'animes': animes_dict })

def add_programmes(request):
    """ Lists all programmes on the main page """

    if request.method == "GET":
        return render(request, 'animes/add.html', {
            'CSVFileUploadForm': CSVFileUploadForm,
            'AnimeForm': AnimeForm
        })
    else:
        file = request.FILES["file"]

        file.open('r')
        csv_file = StringIO(file.read().decode('iso-8859-1'))
        parsed_data = csv.DictReader(csv_file, delimiter=',', quotechar='"', escapechar='\\')

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

        for row in map(dict, parsed_data):
            if len(row) > 0:

                print(row)
                print(row['anime_id'], row['name'])

                anime = Anime(row['anime_id'], row['name'], row['genre'], row['type'], row['episodes'], row['rating'], row['members'])
                anime.save()

                #form = AnimeForm(value) # CSVFileUploadForm(request.POST, request.FILES)
                #if form.is_valid():
                #    form.save()

        animes_dict = Anime.objects.all()
        return render(request, 'animes/list.html', { 'animes': animes_dict })


class RecordView(View):
    """ Record view class """
    def get(self, request):
        """ Record view get Mutator """
        anime_form = AnimeForm()
        return render(request, 'animes/add.html', {
            'CSVFileUploadForm': CSVFileUploadForm,
            'AnimeForm': AnimeForm
        })

    def post(self, request):
        """ Record view post """
        anime_form = AnimeForm(request.POST, request.FILES)
        if anime_form.is_valid():
            anime_form.save()
            return HttpResponseRedirect("/")

        return render(request, 'animes/add.html', {
            'CSVFileUploadForm': CSVFileUploadForm,
            'AnimeForm': AnimeForm
        })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

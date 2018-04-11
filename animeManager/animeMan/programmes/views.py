import csv
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render, reverse, redirect
from .anime import Anime
from .forms import AnimeForm, CSVFileUploadForm
from io import StringIO
from django.contrib.auth.decorators import login_required

# Create your views here.

IMG_UPLOAD_PATH = 'img/profiles/'

def list_programmes(request):
    """ Lists all programmes on the main page """
    animes_dict = Anime.objects.all()
    return render(request, 'animes/list.html', {'animes': animes_dict})

@login_required(redirect_field_name='/')
def add_programmes(request):
    """ Lists all programmes on the main page """
    if request.method == "GET":
        return render(request, 'animes/add.html', {
            'CSVFileUploadForm': CSVFileUploadForm,
            'AnimeForm': AnimeForm
        })
    elif request.method == "POST":
        if len(request.FILES) == 0:
            data = request.POST
            print(data)

            anime = Anime(data['anime_id'], data['name'], data['genre'], data['types'], data['episodes'], data['rating'], data['members'], IMG_UPLOAD_PATH + data['icon'])
            anime.save()

            animes_dict = Anime.objects.all()
            return render(request, 'animes/list.html', {'animes': animes_dict})
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

            print(parsed_data)

            for row in map(dict, parsed_data):
                if len(row) > 0:
                    #print(row)
                    anime = Anime(row['anime_id'], row['name'], row['genre'], row['type'], row['episodes'], row['rating'], row['members'])
                    anime.save()

            animes_dict = Anime.objects.all()
            return render(request, 'animes/list.html', {'animes': animes_dict})

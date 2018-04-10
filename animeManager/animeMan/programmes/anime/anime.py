from django.db import models
import uuid
from django.db.models import (
    UUIDField,
    CharField,
    TextField,
    IntegerField,
    ImageField
)
# Create your models here.

class Anime(models.Model):
    anime_id = UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = CharField(max_length=100)
    genre = TextField()
    MOVIE = "Movie"
    OVA = "OVA"
    TELEVISION = "TV"
    TYPE_CHOICE = (
        (MOVIE, "Movie"),
        (OVA, "OVA"),
        (TELEVISION, "TV")
    )
    types = CharField(max_length=5, choices=TYPE_CHOICE, default="Movie")
    episodes = IntegerField()
    rating = IntegerField()
    members = IntegerField()
    icon = ImageField(null=True, upload_to='img/profiles', verbose_name="Anime Photo")

    def __str__(self):
        return self.name

class Meta:
    model = Anime 
    ordering = ('name',)
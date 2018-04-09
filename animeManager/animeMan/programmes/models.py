from django.db import models
import uuid
from django.db.models import (
    UUIDField,
    CharField,
    TextField,
    IntegerField,
    BooleanField,
    DateTimeField,
    ImageField
)
# Create your models here.

class Programmes(models.Model):
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
    #icon = ImageField(null=True, upload_to='img/profiles', verbose_name="Anime Photo")

class Meta:
    model = Programmes
    ordering = ('name',)
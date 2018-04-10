from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'password')

class SignUpSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length = 100,
        style = {'placeholder': 'Username'}
    )
    email = serializers.EmailField(
        max_length = 100,
        style = {'placeholder': 'Email', 'autofocus': True}
    )
    password = serializers.CharField(
        max_length = 100,
        style = {'input_type': 'password', 'placeholder': 'Password'}
    )
    remember_me = serializers.BooleanField()
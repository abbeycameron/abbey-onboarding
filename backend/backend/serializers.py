from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class RegisterSerial(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ('email', 'password')

    def create(self, validated):
        user = User.objects.create_user(
            email = validated['email'],
            password = validated['password']
        )
        return user 

class LoginSerial(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if user:
                data['user'] = user
            else:
                raise serializers.ValidationError('Incorrect crediential. Please try again')
        else:
            raise serializers.ValidationError('username or password is empty')
        
        return user
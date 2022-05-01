from rest_framework import serializers
from .models import Ticker, Stock
from django.contrib.auth.models import User


class TickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticker
        fields = '__all__'


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    stocks = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)
    profile = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'stocks', 'profile']

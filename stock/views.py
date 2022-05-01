from calendar import month
from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes

from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import requests
from stock.models import Ticker
from stock.serializers import TickerSerializer, UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from datetime import date, timedelta
from dateutil import parser

token = "a5a2c37e07f88e56cb325b8dd0979757bd0fe9c7"


@api_view(["GET"])
@csrf_exempt
# @permission_classes([IsAuthenticated])
def welcome(request):
    content = {"message": "App works"}
    return JsonResponse(content)


@api_view(['GET'])
def get_stock_meta_data(request, ticker):
    result = requests.get(
        "https://api.tiingo.com/tiingo/daily/{ticker}?token={token}".format(ticker=ticker, token=token))
    return Response(result.json())


@api_view(['GET'])
def get_historical_info(request, ticker):
    start = date.today() - timedelta(weeks=104)
    url = "https://api.tiingo.com/tiingo/daily/{ticker}/prices?startDate={year}-{month}-{day}&token={token}".format(
        ticker=ticker, year=start.year, month=start.month, token=token, day=start.day)
    result = requests.get(url)
    # last month
    data = result.json()
    past_month = []
    for i in range(25):
        current = data[len(data) - 1 - i]
        info = dict()
        info['date'] = current['date']
        info['adjClose'] = current['adjClose']
        past_month.append(info)

    # Average of last 6 months
    half_year_avg = []
    lastest_month =  parser.parse(data[-1]['date']).month
    for i in range(6):
        
    # return Response(parser.parse("2022-03-29T00:00:00.000Z").month)
    # past to 2 years
    # return Response(result.json())
    # return Response(past_month)


class TickerList(generics.ListAPIView):
    queryset = Ticker.objects.all()
    serializer_class = TickerSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

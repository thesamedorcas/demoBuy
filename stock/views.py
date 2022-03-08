from django.shortcuts import render

# Create your views here.

from django.http import JsonResponse
from rest_framework.decorators import api_view , permission_classes

from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@api_view(["GET"])
@csrf_exempt
@permission_classes([IsAuthenticated])  
def welcome(request):
    content = {"message": "App works"}
    return JsonResponse(content)
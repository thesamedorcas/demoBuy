from django.urls import include, path
from . import views

urlpatterns = [
  path('', views.welcome),
  # path('/meta/<str:ticker>' , views.get_stock_meta_data)
  path('/meta/<str:ticker>' , views.get_historical_info)
]


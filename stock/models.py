from django.db import models

# Create your models here.

from django.contrib.auth.models import User


class UserProfile(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User',related_name='profile', on_delete=models.CASCADE)
    balance = models.FloatField(default=10000.12)

    def __str__(self):
        return self.balance


class Stock(models.Model):
    by = models.ForeignKey(User,related_name='stocks', on_delete=models.SET_NULL, null=True)
    ticker = models.CharField(max_length=200)
    quantity = models.FloatField()
    price = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.ticker)

# stock meta
class Ticker(models.Model):
    exchangeCode = models.CharField(max_length=20)
    description = models.TextField()
    ticker = models.CharField(max_length=12)
    startDate = models.DateTimeField()
    name = models.CharField(max_length=200)

    class Meta:
        ordering = ['startDate']
from django.db import models
from datetime import date
from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save

class User(AbstractUser):
    budget_total = models.DecimalField(max_digits=9, decimal_places=2, default=0)
    USERNAME_FIELD = 'username' # username by default
    REQUIRED_FIELDS = [] 

    def __str__(self):
        return self.username
    
    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_profile(sender, instance=None, created=False, **kwargs):
        if created:
            cat1 = Category.objects.create(name="Groceries", user=instance)
            Budget.objects.create(category=cat1, user=instance, limit=300)
            cat2 =Category.objects.create(name="Fun", user=instance)
            Budget.objects.create(category=cat2, user=instance, limit=200)
            cat3 = Category.objects.create(name="Car", user=instance)
            Budget.objects.create(category=cat1, user=instance, limit=200)

class Category(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories", default=1)

    def __str__(self):
        return f"{self.name}"

class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="expenses", default=1)
    item_name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="expenses")
    date = models.DateField(default=date.today)
    cost = models.DecimalField(max_digits=9, decimal_places=2)
    description = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.item_name}"
    
    
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="budgets")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="budgets")
    limit = models.FloatField(default=0)

    def __str__(self):
        return f"{self.category.name}: {self.limit}"
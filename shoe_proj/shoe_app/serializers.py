from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'user']

class ExpenseSerializer(serializers.ModelSerializer):
    #category_name = serializers.CharField(source='category.name')
    class Meta:
        model = Expense
        fields = ['id', 'item_name', 'category', 'date', 'cost', 'description', 'user']

class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'user', 'category', 'limit']
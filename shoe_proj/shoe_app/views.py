from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.http import JsonResponse
import copy
from datetime import date


def index(request):
    the_index = open('static/index.html')
    return HttpResponse(the_index)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        print(self.request.user)
        return Category.objects.filter(user=self.request.user)

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user, date__gte=date.today().replace(day=1))
    

@api_view(['GET'])
def summary(request):
    expenses = Expense.objects.filter(user=request.user, date__gte=date.today().replace(day=1))
    budgets = Budget.objects.filter(user=request.user)
    # Create totals dictionary with all cats as keys
    totals = {}
    for budget in budgets:
        cat = budget.category
        totals[cat.name.capitalize()] = [0, budget.limit]
    totals['Total'] = [0, 2000]
    # Add expense cost to appropriate category
    for expense in expenses:
        totals[expense.category.name.capitalize()][0] += float(expense.cost)
        totals['Total'][0] += float(expense.cost)
    print(totals)
    return JsonResponse(totals) 

@api_view(['GET'])
def history(request):
    data = {}
    expenses = Expense.objects.filter(user=request.user)
    budgets = Budget.objects.filter(user=request.user)
    monthly_values = {}
    for budget in budgets:
        cat = budget.category
        monthly_values[cat.name.capitalize()] = [0, budget.limit]
    monthly_values['Total'] = [0, 2000]
    for expense in expenses:
        if f"{expense.date.year}-{expense.date.month}" in data:
            data[f"{expense.date.year}-{expense.date.month}"][expense.category.name.capitalize()][0] += float(expense.cost)
            data[f"{expense.date.year}-{expense.date.month}"]['Total'][0] += float(expense.cost)
        else:
            data[f"{expense.date.year}-{expense.date.month}"] = copy.deepcopy(monthly_values)
            data[f"{expense.date.year}-{expense.date.month}"][expense.category.name.capitalize()][0] += float(expense.cost)
            data[f"{expense.date.year}-{expense.date.month}"]['Total'][0] += float(expense.cost)
    return JsonResponse(data)

@api_view(['POST'])
def log_in(request):
    print(request.data)
    user = authenticate(username=request.data['username'], password=request.data['password'])
    print(user)
    if user is not None:
        if user.is_active:
            try:
                return JsonResponse({
                    'token': user.auth_token.key,
                    'id': user.pk,
                    'username': user.username
                })
            except Exception as e:
                print(str(e))
                return JsonResponse({'success': False, 'reason': 'login failed'})
        else:
            return JsonResponse({'success': False, 'reason': 'user is not active'})
    else:
        return JsonResponse({'success': False, 'reason': 'user does not exist'})
    
@api_view(['POST'])
def whoami(request):
    #print(request.data)
    if request.user.is_authenticated:
        return JsonResponse({
                        'token': request.user.auth_token.key,
                        'id': request.user.pk,
                        'username': request.user.username
                    })
    return JsonResponse({'success': False}) 
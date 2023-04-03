from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.http import JsonResponse


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)
    

@api_view(['GET'])
def summary(request):
    print(request.user)
    expenses = Expense.objects.filter(user=request.user)
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
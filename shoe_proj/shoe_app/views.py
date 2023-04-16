from django.shortcuts import render, HttpResponse
from rest_framework import viewsets
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.http import JsonResponse
from datetime import date
from rest_framework.parsers import JSONParser
import copy, json, requests, os
from dotenv import load_dotenv
load_dotenv()


# Currency conversion api
def convert_currency(cost, type):
    api_key = os.environ['curr_api']
    base_url = "https://api.apilayer.com/exchangerates_data/convert"
    type_to = 'USD'
    endpoint = f"{base_url}?from={type}&to={type_to}&amount={cost}"
    headers = {'apikey': api_key}
    response = requests.get(endpoint, headers=headers)
    responseJSON = response.json()
    print(responseJSON)
    return responseJSON['result']

# Quote api
@api_view(['GET'])
def get_quote(request):
    response = requests.get('https://api.quotable.io/random')
    responseJSON = response.json()
    return JsonResponse({
        'author': responseJSON['author'],
        'quote': responseJSON['content']
    })


def index(request):
    the_index = open('static/index.html')
    return HttpResponse(the_index)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        print(self.request.user)
        return Category.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        print(self.request.user)
        request.data['user'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    # not necessary - the viewset doesn't change the user
    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     request.data['user'] = request.user.id
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)

    #     if getattr(instance, '_prefetched_objects_cache', None):
    #         # If 'prefetch_related' has been applied to a queryset, we need to
    #         # forcibly invalidate the prefetch cache on the instance.
    #         instance._prefetched_objects_cache = {}

    #     return Response(serializer.data)

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user, date__gte=date.today().replace(day=1))
    
    def create(self, request, *args, **kwargs):
        print(request.data)
        data = request.data.dict()
        if data['type'] != 'USD':
            new_cost = convert_currency(data['cost'], data['type'])
            print(new_cost)
            data['cost'] = round(new_cost*100)/100
            print(data['cost'])
            del data['type']
        else:
            del data['type']
        data['user'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
        # print(request.data)
        # item_name, cost, type, description, category_id = [request.data[k] for k in request.data.keys()]
        # category_id = int(category_id)
        # category = Category.objects.get(pk=category_id)
        # if type == 'USD':
        #     print(type)
        # try:
        #     new_expense = Expense.objects.create(item_name = item_name, cost = cost, description = description, category = category, user=request.user)
        #     new_expense.save()
        # # serializer = self.get_serializer(data=data)
        # # serializer.is_valid(raise_exception=True)
        # # self.perform_create(serializer)
        # # headers = self.get_success_headers(serializer.data)
        #     return JsonResponse({
        #         'success': True
        #     })
        # except Exception as e:
        #     print(e)
        #     return JsonResponse({"success": False})

class BudgetViewSet(viewsets.ModelViewSet):
    serializer_class = BudgetSerializer

    def get_queryset(self):
        print(self.request.user)
        return Budget.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        request.data['user'] = request.user.id
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

@api_view(['POST'])
def update_total_budget(request):
    try:
        user = request.user
        print('user', user)
        user.budget_total = request.data['amount']
        user.save()
        print('update', user.budget_total)
        return JsonResponse({'success': True})
    except:
        return JsonResponse({'success': False})


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
    print(data)
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
                    'success': True,
                    'token': user.auth_token.key,
                    'id': user.pk,
                    'username': user.username,
                    'budget': user.budget_total
                })
            except Exception as e:
                print(str(e))
                return JsonResponse({'success': False, 'reason': 'login failed'})
        else:
            return JsonResponse({'success': False, 'reason': 'user is not active'})
    else:
        return JsonResponse({'success': False, 'reason': 'user does not exist'})
    
@api_view(['POST'])
def sign_up(request):
    print(request.data)
    try:
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'])
        # Log in
        return JsonResponse({
            'success': True,
            'token': user.auth_token.key,
            'id': user.pk,
            'username': user.username,
            'budget': user.budget_total
        })
    except Exception as e:
        print(str(e))
        return JsonResponse({'success':False, 'reason':'cannot create'})


    
@api_view(['POST'])
def whoami(request):
    #print(request.data)
    if request.user.is_authenticated:
        return JsonResponse({
                        'token': request.user.auth_token.key,
                        'id': request.user.pk,
                        'username': request.user.username,
                        'budget': request.user.budget_total
                    })
    return JsonResponse({'success': False}) 
from django.urls import path, include, re_path
from .views import *
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import csrf_exempt

router = DefaultRouter()
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'budget', BudgetViewSet, basename='budget')

urlpatterns = [
    path('', index),
    path('api/', include(router.urls)),
    path('api/total/', update_total_budget),
    path('api/summary/', summary),
    path('api/history/', history),
    path('api/login/', log_in),
    path('api/signup/', sign_up),
    path('api/whoami/', whoami),
    re_path(r'.*', index),
]
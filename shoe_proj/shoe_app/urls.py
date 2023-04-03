from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import csrf_exempt

router = DefaultRouter()
router.register(r'category', CategoryViewSet, basename='category')
router.register(r'expenses', ExpenseViewSet, basename='expense')

urlpatterns = router.urls
urlpatterns += [
    path('summary/', summary),
    path('login/', log_in),
    path('whoami/', whoami)
]
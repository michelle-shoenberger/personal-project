from django.contrib import admin
from .models import Expense, Category, User, Budget
from django.contrib.auth.admin import UserAdmin


models = [Expense, Category, Budget]
admin.site.register(models)

class CustomAdmin(UserAdmin):
    model=User
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('budget_total',)}),
    )

admin.site.register(User, CustomAdmin)
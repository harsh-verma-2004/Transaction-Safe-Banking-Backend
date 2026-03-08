from django.contrib import admin
from .models import Transaction, Transfer
from .models import FraudAlert

admin.site.register(Transaction)
admin.site.register(Transfer)
admin.site.register(FraudAlert)
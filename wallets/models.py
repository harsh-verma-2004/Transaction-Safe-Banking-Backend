from django.db import models
from accounts.models import Account

class Wallet(models.Model):
    account = models.OneToOneField(
        Account,
        on_delete=models.CASCADE,
        related_name="wallet"
    )
    balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0
    )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Wallet for {self.account.account_number}"

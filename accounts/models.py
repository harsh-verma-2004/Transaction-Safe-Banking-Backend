from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    ACTIVE = "ACTIVE"
    SUSPENDED = "SUSPENDED"

    STATUS_CHOICES = [
        (ACTIVE, "Active"),
        (SUSPENDED, "Suspended"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_number = models.CharField(max_length=20, unique=True)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=ACTIVE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.account_number

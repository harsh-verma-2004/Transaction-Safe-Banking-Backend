import uuid
from django.db import models
from accounts.models import Account

class Transaction(models.Model):
    CREDIT = "CREDIT"
    DEBIT = "DEBIT"

    TYPE_CHOICES = [
        (CREDIT, "Credit"),
        (DEBIT, "Debit"),
    ]

    SUCCESS = "SUCCESS"
    FAILED = "FAILED"

    STATUS_CHOICES = [
        (SUCCESS, "Success"),
        (FAILED, "Failed"),
    ]

    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    # 🔥 ADD THIS FIELD HERE
    transfer = models.ForeignKey(
        "Transfer",
        on_delete=models.CASCADE,
        related_name="transactions",
        null=True
    )

    type = models.CharField(max_length=6, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    reference_id = models.UUIDField(default=uuid.uuid4)
    status = models.CharField(max_length=7, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["reference_id"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["account"]),
        ]

    def __str__(self):
        return f"{self.type} - {self.amount}"


class Transfer(models.Model):
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"

    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (SUCCESS, "Success"),
        (FAILED, "Failed"),
    ]

    from_account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="outgoing_transfers"
    )

    to_account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name="incoming_transfers"
    )

    amount = models.DecimalField(max_digits=12, decimal_places=2)

    reference_id = models.UUIDField(unique=True)

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default=PENDING
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["reference_id"]),
        ]

    def __str__(self):
        return f"{self.from_account} → {self.to_account} ({self.amount})"

class FraudAlert(models.Model):
    transfer = models.OneToOneField(
        Transfer,
        on_delete=models.CASCADE,
        related_name="fraud_analysis"
    )

    risk_score = models.FloatField()
    is_suspicious = models.BooleanField(default=False)
    reason = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fraud Risk: {self.risk_score} ({self.is_suspicious})"

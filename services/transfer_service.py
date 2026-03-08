from django.db import transaction
from django.core.exceptions import ValidationError
from wallets.models import Wallet
from transactions.models import Transaction, Transfer
from audits.models import AuditLog
from services.fraud_service import evaluate_transfer_risk

def transfer_funds(
    *,
    from_account_id: int,
    to_account_id: int,
    amount,
    reference_id,
    initiated_by
):
    if amount <= 0:
        raise ValidationError("Amount must be positive")

    if from_account_id == to_account_id:
        raise ValidationError("Cannot transfer to the same account")

    with transaction.atomic():

        # Idempotency check
        existing_transfer = Transfer.objects.filter(reference_id=reference_id).first()
        if existing_transfer:
            return {"status": "duplicate_request"}

        sender_wallet = Wallet.objects.select_for_update().get(
            account_id=from_account_id
        )

        receiver_wallet = Wallet.objects.select_for_update().get(
            account_id=to_account_id
        )

        if sender_wallet.balance < amount:
            raise ValidationError("Insufficient balance")

        # Create transfer record (pending)
        transfer = Transfer.objects.create(
            from_account_id=from_account_id,
            to_account_id=to_account_id,
            amount=amount,
            reference_id=reference_id,
            status=Transfer.PENDING
        )

        try:
            # Update balances
            sender_wallet.balance -= amount
            receiver_wallet.balance += amount

            sender_wallet.save()
            receiver_wallet.save()

            # Ledger entries
            Transaction.objects.create(
                account_id=from_account_id,
                type=Transaction.DEBIT,
                amount=amount,
                reference_id=reference_id,
                status=Transaction.SUCCESS,
                transfer=transfer
            )

            Transaction.objects.create(
                account_id=to_account_id,
                type=Transaction.CREDIT,
                amount=amount,
                reference_id=reference_id,
                status=Transaction.SUCCESS,
                transfer=transfer
            )

            transfer.status = Transfer.SUCCESS
            transfer.save()

            # Run fraud evaluation (non-blocking logic)
            evaluate_transfer_risk(transfer)


            AuditLog.objects.create(
                user=initiated_by,
                action=f"Transfer {amount} from {from_account_id} to {to_account_id}"
            )

            return {"status": "success"}

        except Exception:
            transfer.status = Transfer.FAILED
            transfer.save()
            raise

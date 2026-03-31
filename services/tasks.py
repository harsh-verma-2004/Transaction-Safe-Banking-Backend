from celery import shared_task
from transactions.models import Transfer
from services.fraud_service import evaluate_transfer_risk

@shared_task
def run_fraud_detection(transfer_id):
    transfer = Transfer.objects.get(id=transfer_id)
    evaluate_transfer_risk(transfer)
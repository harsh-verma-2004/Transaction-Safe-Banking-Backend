import random
from transactions.models import FraudAlert


def evaluate_transfer_risk(transfer):
    """
    Simple fraud detection logic (can later replace with ML model)
    """

    risk_score = 0

    # Rule 1: High amount risk
    if transfer.amount > 1000:
        risk_score += 40

    # Rule 2: Random anomaly simulation
    risk_score += random.randint(0, 30)

    is_suspicious = risk_score > 50

    reason = None
    if is_suspicious:
        reason = "High amount or unusual pattern detected"

    FraudAlert.objects.create(
        transfer=transfer,
        risk_score=risk_score,
        is_suspicious=is_suspicious,
        reason=reason
    )

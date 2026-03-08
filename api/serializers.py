from rest_framework import serializers

class TransferSerializer(serializers.Serializer):
    from_account_id = serializers.IntegerField()
    to_account_id = serializers.IntegerField()
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    reference_id = serializers.UUIDField()

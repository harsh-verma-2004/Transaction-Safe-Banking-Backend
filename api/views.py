from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError
from services.transfer_service import transfer_funds
from .serializers import TransferSerializer
from rest_framework.permissions import IsAuthenticated

class TransferAPIView(APIView):
    
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransferSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            result = transfer_funds(
                from_account_id=serializer.validated_data["from_account_id"],
                to_account_id=serializer.validated_data["to_account_id"],
                amount=serializer.validated_data["amount"],
                reference_id=serializer.validated_data["reference_id"],
                initiated_by=request.user
            )

            return Response(result, status=status.HTTP_201_CREATED)

        except ValidationError as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        except Exception:
            return Response(
                {"error": "Internal server error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

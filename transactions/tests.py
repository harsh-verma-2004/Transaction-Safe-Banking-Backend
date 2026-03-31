from django.test import TestCase
from django.contrib.auth.models import User
from accounts.models import Account
from wallets.models import Wallet
from services.transfer_service import transfer_funds
import uuid

class TransferTestCase(TestCase):

    def setUp(self):
        # Create users
        self.user1 = User.objects.create_user(username="user1", password="pass123")
        self.user2 = User.objects.create_user(username="user2", password="pass123")

        # Create accounts
        self.account1 = Account.objects.create(user=self.user1, account_number="ACC1")
        self.account2 = Account.objects.create(user=self.user2, account_number="ACC2")

        # Create wallets
        self.wallet1 = Wallet.objects.create(account=self.account1, balance=1000)
        self.wallet2 = Wallet.objects.create(account=self.account2, balance=500)

    def test_successful_transfer(self):
        result = transfer_funds(
            from_account_id=self.account1.id,
            to_account_id=self.account2.id,
            amount=100,
            reference_id=uuid.uuid4(),
            initiated_by=self.user1
        )

        self.assertEqual(result["status"], "success")

        self.wallet1.refresh_from_db()
        self.wallet2.refresh_from_db()

        self.assertEqual(self.wallet1.balance, 900)
        self.assertEqual(self.wallet2.balance, 600)


    def test_insufficient_balance(self):
        with self.assertRaises(Exception):
            transfer_funds(
                from_account_id=self.account1.id,
                to_account_id=self.account2.id,
                amount=10000,
                reference_id=uuid.uuid4(),
                initiated_by=self.user1
            )


    def test_unauthorized_transfer(self):
        with self.assertRaises(Exception):
            transfer_funds(
                from_account_id=self.account1.id,
                to_account_id=self.account2.id,
                amount=100,
                reference_id=uuid.uuid4(),
                initiated_by=self.user2
            )


    def test_duplicate_request(self):
        ref_id = uuid.uuid4()

        transfer_funds(
            from_account_id=self.account1.id,
            to_account_id=self.account2.id,
            amount=100,
            reference_id=ref_id,
            initiated_by=self.user1
        )

        result = transfer_funds(
            from_account_id=self.account1.id,
            to_account_id=self.account2.id,
            amount=100,
            reference_id=ref_id,
            initiated_by=self.user1
        )

        self.assertEqual(result["status"], "duplicate_request")
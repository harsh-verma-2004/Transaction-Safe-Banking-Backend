import redis

r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

def get_wallet_balance(account_id):
    key = f"wallet:{account_id}"
    balance = r.get(key)

    if balance is not None:
        return float(balance)

    return None


def set_wallet_balance(account_id, balance):
    key = f"wallet:{account_id}"
    r.set(key, float(balance))


def invalidate_wallet(account_id):
    key = f"wallet:{account_id}"
    r.delete(key)
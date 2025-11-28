import os


class Config:
    """Base config app"""

    SECRET_KEY = os.environ.get("SECRET_KEY") or "super-secret-"

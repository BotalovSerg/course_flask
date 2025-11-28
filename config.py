import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    """Base config app"""

    SECRET_KEY = os.environ.get("SECRET_KEY") or "super-secret-"
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or "sqlite:///" + os.path.join(
        basedir, "app.db"
    )

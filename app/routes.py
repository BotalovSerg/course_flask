from flask import render_template
from app import app


@app.route("/")
@app.route("/index")
def index():
    context = {
        "username": "Sergey",
        "title": "MicroBLog",
    }

    return render_template("index.html", **context)

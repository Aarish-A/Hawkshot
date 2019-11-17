from flask import Flask
from flask_cors import CORS

app = Flask(__name__,
static_folder='../client/build/static',
template_folder='../client/build')

CORS(app)

import templates.views

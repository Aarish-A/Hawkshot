from flask import Flask

app = Flask(__name__,
static_folder='../client/build/static',
template_folder='../client/build')

import templates.views
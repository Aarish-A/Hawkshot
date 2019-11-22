from templates import app
import os

#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')
app.run()

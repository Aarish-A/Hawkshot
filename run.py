from templates import app
#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')

port = int(os.environ.get('PORT', 33507))

app.run(port=port)

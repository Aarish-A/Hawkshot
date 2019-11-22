from templates import app
import os
#Load this config object for development mode
app.config.from_object('configurations.DevelopmentConfig')

port = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(port=port)

from templates import app
import templates.api
from flask import render_template, request, Response
import google.oauth2.id_token, google.auth.transport.requests
from google.cloud import firestore

<<<<<<< HEAD
#TODO COMMENT EVERYTHING

=======
>>>>>>> e4c69ce524df7caea0c7836463958bff3d5689d8
HTTP_REQUEST = google.auth.transport.requests.Request()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
     return render_template('index.html')

@app.route('/api/hints', methods=['POST'])
def post_hint():
<<<<<<< HEAD
    #verify firebase auth
=======
    # verify firebase auth
>>>>>>> e4c69ce524df7caea0c7836463958bff3d5689d8
    id_token = request.headers['Authorization'].split(' ').pop()
    print(id_token)
    claims = google.oauth2.id_token.verify_firebase_token(id_token, HTTP_REQUEST)
    if not claims:
        return Response('failed', 'Unauthorized', 401)
    if not request.content_type == 'application/json':
        return Response('failed', 'content_type must be application/json', 401)

    result = request.get_json()
    print(result['content'])
    templates.api.PostHint(result)
    return 'bruh' #TODO Fill in proper response

@app.route('/api/hints', methods=['GET'])
def get_hint():
    result = request.args
    data = {
        'cardId': request.args.get('cardId', None),
        'ownerId': request.args.get('ownerId', None),
        'limit': request.args.get('limit', 20),
        'hintId': request.args.get('hintId', None),
<<<<<<< HEAD
        'sortBy': request.args.get('sortBy', None), #TODO add range filter too
=======
        'sortBy': request.args.get('sortBy', None),
>>>>>>> e4c69ce524df7caea0c7836463958bff3d5689d8
    }
    return templates.api.GetHint(data)

@app.route('/api/hints/<hintId>', methods=['PUT'])
def put_hint(hintId):
    type = request.args.get('type', None)
    return templates.api.UpdateHint(hintId, type=type)

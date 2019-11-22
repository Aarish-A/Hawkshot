from templates import app
import templates.api
from flask import render_template, request, Response
import google.oauth2.id_token, google.auth.transport.requests
from google.cloud import firestore

HTTP_REQUEST = google.auth.transport.requests.Request()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
     return render_template('index.html')

# Route for posting hints
# AUTH TOKEN REQUIRED - user must be signed in
@app.route('/api/hints', methods=['POST'])
def post_hint():
    # verify firebase auth
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(id_token, HTTP_REQUEST)
    if not claims:
        return Response('failed', 'Unauthorized', 401)
    if not request.content_type == 'application/json':
        return Response('failed', 'content_type must be application/json', 401)

    result = request.get_json()
    result['ownerId'] = claims['user_id']
    result['ownerName'] = claims['name']

    return templates.api.PostHint(result)

# Route for querying hints
# No auth token required, anybody can access
@app.route('/api/hints', methods=['GET'])
def get_hint():
    data = {
        'cardId': request.args.get('cardId', None),
        'cardName': request.args.get('cardName', None),
        'ownerId': request.args.get('ownerId', None),
        'limit': request.args.get('limit', 18),
        'hintId': request.args.get('hintId', None),
        'sortBy': request.args.get('sortBy', 'popular'),
        'sortCat': request.args.get('sortCat', 'all'),
    }
    return templates.api.GetHint(data)

# Route for voting (funny or helpful)
# AUTH TOKEN REQUIRED - user must be signed in
@app.route('/api/hints/<hintId>', methods=['PUT'])
def put_hint(hintId):
    #verify firebase auth
    id_token = request.headers['Authorization'].split(' ').pop()
    print(id_token)
    claims = google.oauth2.id_token.verify_firebase_token(id_token, HTTP_REQUEST)
    if not claims:
        return Response('failed', 'Unauthorized', 401)

    type = request.args.get('type', None)
    return templates.api.UpdateHint(hintId, userId=claims['user_id'], type=type)

# Route for reporting offensive/spammy hints
# AUTH TOKEN REQUIRED - user must be signed in
@app.route('/api/report/<hintId>', methods=['POST'])
def report_hint(hintId):
    #verify firebase auth
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(id_token, HTTP_REQUEST)
    if not claims:
        return Response('failed', 'Unauthorized', 401)
    if not request.content_type == 'application/json':
        return Response('failed', 'content_type must be application/json', 401)
    result = request.get_json()
    result['hintId'] = hintId
    result['ownerId'] = claims['user_id']
    result['ownerName'] = claims['name']

    return templates.api.ReportHint(result)

# Route for deleting hints
# AUTH TOKEN REQUIRED - user must be signed in
# templates.api.DeleteHint checks if the user owns the hint
@app.route('/api/hints/<hintId>', methods=['DELETE'])
def delete_hint(hintId):
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(id_token, HTTP_REQUEST)
    if not claims:
        return Response('failed', 'Unauthorized', 401)

    return templates.api.DeleteHint(hintId, userId=claims['user_id'])

# Route for getting cards
# No auth token required, anybody can access
@app.route('/api/cards', methods=['GET'])
def get_card():
    data = {
        'cardId': request.args.get('cardId', None),
        'cardName': request.args.get('cardName', None),
        'limit': request.args.get('limit', 20),
        'sortCat': request.args.get('sortCat', 'all'),
    }
    return templates.api.GetCard(data)

# Route for getting reports
# AUTH TOKEN REQUIRED - user must be signed in
@app.route('/api/votes', methods=['GET'])
def get_vote():
    id_token = request.headers['Authorization'].split(' ').pop()
    claims = google.oauth2.id_token.verify_firebase_token(id_token, HTTP_REQUEST)
    if not claims:
        return Response('failed', 'Unauthorized', 401)
    data = {'ownerId': claims['user_id']}

    return templates.api.GetVotes(data)

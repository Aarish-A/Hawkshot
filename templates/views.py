from templates import app
import templates.api
from flask import render_template, request, Response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
<<<<<<< HEAD
     return render_template('index.html')

@app.route('/api/hints', methods=['POST'])
def post_hint():
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
        'limit': request.args.get('limit', 20)
    }
    return templates.api.GetHint(data)

@app.route('/api/hints/<hintId>', methods=['PUT'])
def put_hint(hintId):
    #templates.api.updateHint(hintId, type='')
    return 'bruh momento'
=======
     return render_template('index.html')
>>>>>>> 3d1d664d5e46af1bac2af58b3992120c8216275f

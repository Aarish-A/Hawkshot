import firebase_admin, time
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1 import transforms
from flask import Response
from templates.card_set import card_set
from profanity_check import predict
from pathlib import Path
import os

# initialize firestore
cert_json = Path("hawkshot-e7e56-firebase-adminsdk-1zawp-35a7f1dc88.json")
if cert_json.is_file():
    print("Loading app from file... ")
    cred = credentials.Certificate("hawkshot-e7e56-firebase-adminsdk-1zawp-35a7f1dc88.json")
else:
    print("Loading app from environment variables... (this is probably Heroku)")
    cred = credentials.Certificate({
        "type": "service_account",
        "project_id": os.environ.get('PROJECT_ID'),
        "private_key_id": os.environ.get('PRIVATE_KEY_ID'),
        "private_key": os.environ.get('PRIVATE_KEY').replace('\\n', '\n'),
        "client_email": os.environ.get('CLIENT_EMAIL'),
        "client_id": os.environ.get('CLIENT_ID'),
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": os.environ.get('CLIENT_CERT_URL')
    })

firebase_admin.initialize_app(cred, {
    'projectId': "hawkshot-e7e56",
})
db = firestore.client()

# POST /api/hints/
def PostHint(data):

    # filter through data and censors it
    content = data['content'].split(" ")
    profanities = predict(content)
    filtered = " "
    filtered = filtered.join([content[i] if profanities[i] == 0 else (content[i][0]+'*'*(len(content[i])-1)) for i in range(0, len(content))])

    # limit to 140 characters
    filtered = filtered[:140]
    ref = db.collection(u'hints').document()

    # update Firestore
    ref.set({
        u'content': filtered,
        u'cardId': data['cardId'],
        u'cardName': next((x for x in card_set if x['cardCode'] == data['cardId']), "card doesn't exist?")['name'], #find card in card_set
        u'ownerId': data['ownerId'],
        u'ownerName': data['ownerName'],
        u'funny': 0,
        u'helpful': 0,
        u'votes': 0,
        u'trending': 0,
        u'id': ref.id,
        u'hidden': False,
        u'timestamp': int(time.time()),
    })
    return Response('Hint successfully posted', 200);

# GET /api/hints
def GetHint(data):
    ref = db.collection(u'hints')
    query = ref
    query = query.limit(int(data['limit']))

    print('sort params: ', data)

    if data['cardId']:
        # search by card id (CURRENTLY UNUSABLE WITHOUT AN INDEX)
        query = query.where(u'cardId', u'in', data['cardId'].split(','))
    elif data['cardName']:
        # search by card name
        query = query.where(u'cardName', u'in', data['cardName'].split(','))
    if data['ownerId']:
        # search by hint author
        query = query.where(u'ownerId', u'==', data['ownerId'])

    if data['sortBy'] == 'popular':
        # search by popularity of a type of vote, or by both
        if data['sortCat'] == 'all': arg = u'votes'
        elif data['sortCat'] == 'funny': arg = u'funny'
        elif data['sortCat'] == 'helpful': arg = u'helpful'
        else: arg = u'helpful'

        query = query.order_by(arg, direction=firestore.Query.DESCENDING)
    elif data['sortBy'] == 'recent':
        # search by most recent
        query = query.order_by('timestamp', direction=firestore.Query.DESCENDING)
    elif data['sortBy'] == 'trending':
        # search by trending (NOT FULLY FUNCTIONAL)
        query = query.order_by('trending', direction=firestore.Query.DESCENDING)
    else:
        # default search by popularity by helpful votes
        query = query.order_by('helpful', direction=firestore.Query.DESCENDING)

    # search by specific hint id
    if data['hintId']:
        query = query.document(data['hintId'])

    # only return non-hidden hints
    query = query.where(u'hidden', u'==', False)

    docs = query.stream()

    result = {'hints':[]}
    for doc in docs:
        result['hints'].append(doc.to_dict())
    return result

# PUT /api/hint/<hintId>
def UpdateHint(hintId, userId, type):

    hint_ref = db.collection(u'hints').document(hintId)

    if type == 'helpful' or type == 'nothelpful':
        # toggle helpful vote, updating Firestore
        helpful_ref = db.collection(u'helpfulVotes').document(hintId)
        helpful_dict = helpful_ref.get().to_dict()
        if not helpful_dict:
            hint_ref.update({u'helpful':transforms.Increment(1)})
            helpful_ref.set({userId: True})
        elif not helpful_dict[userId]:
            hint_ref.update({u'helpful':transforms.Increment(1)})
            helpful_ref.update({userId: True})
        else:
            hint_ref.update({u'helpful':transforms.Increment(-1)})
            helpful_ref.update({userId: firestore.DELETE_FIELD})

    elif type == 'funny' or type == 'notfunny':
        # toggle funny vote, updating Firestore
        funny_ref = db.collection(u'funnyVotes').document(hintId)
        funny_dict = funny_ref.get().to_dict()
        if not funny_dict:
            hint_ref.update({u'funny':transforms.Increment(1)})
            funny_ref.set({userId: True})
        elif not funny_dict[userId]:
            hint_ref.update({u'funny':transforms.Increment(1)})
            funny_ref.update({userId: True})
        else:
            hint_ref.update({u'funny':transforms.Increment(-1)})
            funny_ref.update({userId: firestore.DELETE_FIELD})
    else:
        return Response('failed', 'Invalid type', 401)

    return Response('Hint successfully updated', 200)

# POST /api/report/<hintId>
def ReportHint(data):
    ref = db.collection(u'reports').document()
    # update Firestore
    ref.set({
        u'hintId': data['hintId'],
        u'content': data['content'],
        u'ownerId': data['ownerId'],
        u'ownerName': data['ownerName'],
        u'id': ref.id,
        u'timestamp': int(time.time()),
    })

    return Response('Hint successfully reported', 200)

# DELETE /api/hints/<hintId>
def DeleteHint(hintId, userId):
    ref = db.collection(u'hints').document(hintId)
    # User must be the owner of the hint to delete it
    # TODO roles (moderators/admin accounts)
    if(ref.get().to_dict()['ownerId'] == userId):
        # update Firestore
        ref.delete()
        return Response('Hint successfully deleted', 200)
    else:
        return Response('Only the hint owner can delete this hint', 403)

# GET /api/cards/
def GetCard(data):
    ref = db.collection(u'cards')
    query = ref
    query = query.limit(int(data['limit']))

    if data['cardId']:
        # search by card id
        query = query.where(u'id', u'in', data['cardId'].split(','))
    elif data['cardName']:
        # search by card name
        query = query.where(u'name', u'in', data['cardName'].split(','))

    # search by popularity of types of votes, or by number of hints
    if data['sortCat'] == 'all': arg = u'votes'
    elif data['sortCat'] == 'funny': arg = u'funny'
    elif data['sortCat'] == 'helpful': arg = u'helpful'
    elif data['sortCat'] == 'hints': arg = u'hints'
    else: arg = u'helpful'

    query = query.order_by(arg, direction=firestore.Query.DESCENDING)

    docs = query.stream()

    result = {'cards':[]}
    for doc in docs:
        result['cards'].append(doc.to_dict())
    return result

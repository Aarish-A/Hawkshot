import firebase_admin, time
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1 import transforms
from flask import Response
from templates.card_set import card_set

cred = credentials.Certificate("hawkshot-e7e56-firebase-adminsdk-1zawp-35a7f1dc88.json")
firebase_admin.initialize_app(cred, {
    'projectId': "hawkshot-e7e56",
})

db = firestore.client()


# Data:
def PostHint(data):
    ref = db.collection(u'hints').document()
    ref.set({
        u'content': data['content'],
        u'cardId': data['cardId'],
        u'cardName': next((x for x in card_set if x['cardCode'] == data['cardId']), "card doesn't exist?")['name'],
        u'ownerId': data['ownerId'],
        u'ownerName': data['ownerName'],
        u'funny': 0,
        u'helpful': 0,
        u'votes': 0,
        u'trending': 0,
        u'id': ref.id,
        u'timestamp': int(time.time()),
    })

    return Response('Hint successfully posted', 200);

def GetHint(data): #TODO implement all filters
    ref = db.collection(u'hints')
    query = ref
    query = query.limit(int(data['limit']))

    if data['cardId']:
        query = query.where(u'cardId', u'==', data['cardId'])
    elif data['cardName']:
        query = query.where(u'cardName', u'==', data['cardName'])
    if data['ownerId']:
        query = query.where(u'ownerId', u'==', data['ownerId'])


    if data['sortBy'] == 'popular':
        if data['sortCat'] == 'all': arg = u'votes'
        elif data['sortCat'] == 'funny': arg = u'funny'
        elif data['sortCat'] == 'helpful': arg = u'helpful'
        else: arg = u'helpful'

        query = query.order_by(arg, direction=firestore.Query.DESCENDING)
    elif data['sortBy'] == 'recent':
        query = query.order_by('timestamp', direction=firestore.Query.DESCENDING)
    elif data['sortBy'] == 'trending':
        query = query.order_by('trending', direction=firestore.Query.DESCENDING)
    else:
        query = query.order_by('helpful', direction=firestore.Query.DESCENDING)

    if data['hintId']:
        query = query.document(data['hintId'])
    #TODO sorttype
    docs = query.stream()

    result = {'hints':[]}
    for doc in docs:
        result['hints'].append(doc.to_dict())

    return result

def UpdateHint(hintId, userId, type):
    hint_ref = db.collection(u'hints').document(hintId)

    if type == 'helpful' or type == 'nothelpful':
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

    return Response('Hint successfully updated', 200);

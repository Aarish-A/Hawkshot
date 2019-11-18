import firebase_admin, time
from firebase_admin import credentials, firestore
from google.cloud.firestore_v1 import transforms

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
        u'ownerId': data['ownerId'],
        u'funny': 0,
        u'helpful': 0,
        u'id': ref.id,
        u'timestamp': int(time.time()),
    })

def GetHint(data): #TODO implement all filters
    ref = db.collection(u'hints')
    query = ref
    query = query.limit(int(data['limit']))

    if data['cardId']:
        query = query.where(u'cardId', u'==', data['cardId'])
    if data['ownerId']:
        query = query.where(u'ownerId', u'==', data['ownerId'])
    if data['sortBy']:
        dir, arg  = data['sortBy'].split('_')
        if dir == 'a':
            dir = firestore.Query.ASCENDING
        else:
            dir = firestore.Query.DESCENDING
        query = query.order_by(arg, direction=dir)
        print(arg, dir)
    if data['hintId']:
        query = query.document(data['hintId'])

    docs = query.stream()

    result = {'hints':[]}
    for doc in docs:
        result['hints'].append(doc.to_dict())

    return result

def UpdateHint(hintId, type):
    hint_ref = db.collection(u'hints').document(hintId)
    if type == 'helpful':
        hint_ref.update({u'helpful':transforms.Increment(1)})
    elif type == 'nothelpful':
        hint_ref.update({u'helpful':transforms.Increment(-1)})
    elif type == 'funny':
        hint_ref.update({u'funny':transforms.Increment(1)})
    elif type == 'notfunny':
        hint_ref.update({u'funny':transforms.Increment(-1)})
    else:
        return Response('failed', 'Invalid type', 401)
    return "bruh"

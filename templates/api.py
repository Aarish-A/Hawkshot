import firebase_admin, time
from firebase_admin import credentials, firestore

cred = credentials.Certificate("hawkshot-e7e56-firebase-adminsdk-1zawp-37a5fbdce5.json")
firebase_admin.initialize_app(cred, {
    'projectId': "hawkshot-e7e56",
})

db = firestore.client()


# Data:
def PostHint(data):
    ref = db.collection(u'hints').document();
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
    if data['cardId']:
        query = query.where(u'cardId', u'==', data['cardId'])
    if data['ownerId']:
        query = query.where(u'ownerId', u'==', data['ownerId'])

    query = query.limit(int(data['limit']))

    docs = query.stream()
    print ('ok boomer')

    result = {'hints':[]}
    for doc in docs:
        result['hints'].append(doc.to_dict())

    return result

def UpdateHint(hintId, type):
    return "bruh"

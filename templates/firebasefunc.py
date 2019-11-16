import firebase_admin
from firegbase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("hawkshot-e7e56-firebase-adminsdk-1zawp-37a5fbdce5.json")
firebase_admin.intialize_app(cred, {
    'projectId': project_id,
})

db = firestore.client()


# Data:
def CreateHint(CardID, Data):
    card_ref = db.collection('hints').document(CardID)
    card_ref.set({
        
    })

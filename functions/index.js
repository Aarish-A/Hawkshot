const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.aggregateVotes = functions.firestore
  .document('hints/{hintId}')
  .onWrite((change, context) =>{
    const funny = change.after.data().funny;
    const helpful = change.after.data().helpful;
    const timestamp = change.after.data().timestamp;
    //const cardId = change.after.data().cardId;

    const hintRef = db.collection('hints').doc(context.params.hintId);
    //const cardRef = db.collection('cards').doc(cardId);

    return db.runTransaction(transaction => {
      return transaction.get(hintRef).then(hint => {
        const total = funny + helpful;
        const minutesElapsed = ((new Date()).getTime() - timestamp) / 60000;
        const score = total * Math.pow(0.5, minutesElapsed/120);
        return transaction.update(hintRef, {
          votes: total,
          trending: score,
        })
      });
    });
  });

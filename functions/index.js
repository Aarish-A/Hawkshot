//
// Handles vote aggregation to find total votes per hint/card, as well as track
// and elimate hints that have been reported too many times
//

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

const REPORT_THRESHOLD = 5;

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.aggregateVotes = functions.firestore
  .document('hints/{hintId}')
  .onWrite((change, context) => {
    const funny = change.after.data().funny;
    const helpful = change.after.data().helpful;
    const timestamp = change.after.data().timestamp;
    const cardId = change.after.data().cardId;
    const total = funny + helpful;

    const hintRef = db.collection('hints').doc(context.params.hintId);

    return db.runTransaction(transaction => {
      const cardRef = db.collection('cards').doc(cardId);
      return transaction.getAll(hintRef, cardRef).then(docs => {
        const hint = docs[0];
        const card = docs[1];

        const minutesElapsed = ((new Date()).getTime() - timestamp) / 60000;
        const score = total * Math.pow(0.5, minutesElapsed/120);

        const diffFunny = funny - change.before.data().funny;
        const diffHelpful = helpful - change.before.data().helpful;
        const diffTotal = total - change.before.data().funny - change.before.data().helpful;

        transaction.update(hintRef, {
          votes: total,
          trending: score,
        })

        return transaction.update(cardRef, {
          funny: card.data().funny + diffFunny,
          helpful: card.data().helpful + diffHelpful,
          votes: card.data().votes + diffTotal,
        })
      })
    });
  })

exports.addHintCount = functions.firestore
  .document('hints/{hintId}')
  .onCreate((snap, context) => {
    const cardId = snap.data().cardId;
    const cardRef = db.collection('cards').doc(cardId);

    return db.runTransaction(transaction => {
      return transaction.get(cardRef).then(card => {

        if(card.exists){
          return transaction.update(cardRef, {
            hints: card.data().hints + 1
          })
        }else{
          const cardName = snap.data().cardName;
          return transaction.set(cardRef, {
            id: cardId,
            name: cardName,
            funny: 0,
            helpful: 0,
            votes: 0,
            hints: 1,
          })
        }
      })
    })

  });

  exports.addReportCount = functions.firestore
    .document('reports/{reportId}')
    .onCreate((snap, context) => {
      const hintId = snap.data().hintId;
      const reportCountRef = db.collection('reportCounts').doc(hintId);

      return db.runTransaction(transaction => {
        return transaction.get(reportCountRef).then(reportCount => {
          const newReportCount = reportCount.exists? reportCount.data().reports + 1 : 1;
          if(newReportCount < REPORT_THRESHOLD){
            return 0;
          }else{
            const hintRef = db.collection('hints').doc(hintId);
            return transaction.update(hintRef, {
              hidden: true
            })
          }
        })
      })

    });

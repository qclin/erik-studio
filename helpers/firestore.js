const admin = require('firebase-admin');
var Q = require('q');
const Firestore = require('@google-cloud/firestore');
var serviceAccount = require('../configs/erik-studio-firebase-adminsdk-0osez-dadc403849.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

// // add data
// var docRef = db.collection('users').doc('alovelace');
//
// var setAda = docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });


// Firestore.FieldPath.documentId()
// READ
function getProjects(){
  var deferred = Q.defer();
  db.collection('projects').orderBy('sequence','desc').get().then((snapshot) => {
      var payload = [];
      snapshot.forEach((doc) => {
        // console.log(doc.id, '=>', doc.data());
        var dummy = new Object();
        dummy.key = doc.id
        dummy.fields = doc.data();
        payload.push(dummy);
      });
      deferred.resolve(payload);
    }).catch((err) => {
      console.log('Error getting documents', err);
      deferred.resolve(err)
    });
    return deferred.promise;
}

function getProjectbyKey(key){
  var deferred = Q.defer();
  db.collection('projects').doc(key).get().then((doc) => {
        if(!doc.exists){
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.id, '=>', doc.data());
          deferred.resolve(doc.data());
        }
    }).catch((err) => {
      console.log('Error getting documents', err);
      deferred.resolve(err)
    });
    return deferred.promise;
}

function getBiography(){
  var deferred = Q.defer();
  db.collection('about').get().then((snapshot) => {
    var payload = [];
    console.log("----------- snap snap ", snapshot);
    snapshot.forEach((doc) => {
      payload.push(doc.data());
    });

    deferred.resolve(payload)

  }).catch((err) =>{
    console.log('Error getting documents', err);
    deferred.resolve(err)
  });
  return deferred.promise;
}

module.exports = {
  getProjects,
  getProjectbyKey,
  getBiography
}

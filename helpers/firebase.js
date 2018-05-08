import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var Q = require('q');
var config = require('./firebaseCredential.json');

firebase.initializeApp(config);


var database = firebase.database();
var databaseref = database.ref("test");
databaseref.once('value', function(snapshot){
  console.log(snapshot.val())
});


var storage = firebase.storage();
var storageRef = storage.ref();
var storeProjRef = storageRef.child('projects');
var storeAboutRef = storageRef.child('about')


var projectRef = database.ref('projects');

function getProjectData(title){
	var deferred = Q.defer();

	projectRef.child(title).once("value", function(snapshot) {
	  console.log(snapshot.val());
		deferred.resolve(snapshot.val());
	}, function(errorObject){
		deferred.resolve(err)
	});

	return deferred.promise;
}


module.exports = {
  getProjectData
}

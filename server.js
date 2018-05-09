var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Q = require('q');
var pug = require('pug');

// var firebaseSDK = require('./helpers/firebase.js');
// var aws = require('./helpers/awsS3.js');


var firestoreSDK = require('./helpers/firestore.js');

var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + "/assets"));

app.set('views', './views');
app.set('view engine', 'pug');

// app.get('/', function(req, res){
// 	res.render('index');
// });

app.get('/', function(req, res){
	firestoreSDK.getProjects().then(projectList =>{
		// here should pass a list of projects
		console.log("index page recieved :::", projectList)
		res.render('index', {projectList});
	})
});

app.get('/projects/:key', function(req, res){
	var key = req.params.key
  firestoreSDK.getProjectbyKey(key).then(payload => {
		console.log('SERVER recieve projectbykey: ', payload);
		//TODO: list of IMAGEURLs, helper for storage fetch
		//TODO: media link if any
    res.render(`projects/index`, {payload})
  })
});

// TODO: CV page
// TODO: nav / about section

// app.get('/projects/:title', function(req, res){
// 	var title = req.params.title
//   firebaseSDK.getProjectInfo(title).then(json => {
//     res.render(`projects/${projectTitle}`, {json})
//   })
// });

app.get('/about', function(req, res){
	firestoreSDK.getBiography().then(docs => {
		console.log('SERVER recieve biography : ', docs);

		res.render('about', {docs});
	})
});

app.listen(3000);
// app.listen(443);
console.log('Listening on port 3000');

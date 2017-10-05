//*****1. require express********
// Load the express module that we install using npm
var express = require("express");
// invoke var express and store the resulting application in var app
var app = express();

//******SESSION*******
// new code:
var session = require('express-session');
// original code:
var app = express();
// more new code:
app.use(session({secret: 'lovebunnies'}));  // string for encryption

//***Use Templates
// This sets the location where express will look for the ejs views: ejs stands for embebedded JS
app.set('views', __dirname + '/views');
//we need to install ejs
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

//***PARSE DATA*****
// require body-parser
var bodyParser = require('body-parser');
// use it!
app.use(bodyParser.urlencoded({extended: true}));

//**** 2. create routes ********
//root route
app.get('/', function(request, response) {
  response.render('index')
  console.log("its working");
});

//**** form route: take data********
app.post('/form', function(request, response) {
  console.log("DATA",request.body);
  request.session.data = {
    "name": request.body.name,
    "location": request.body.location,
    "fav_lang": request.body.fav_lang,
    "comment": request.body.comment,
  }

  response.redirect('/results')
  console.log("we are redirecting to Result");
});

//**** Result ********
app.get('/results', function(request, response) {
  var user_data = request.session.data
  console.log("This is user_data", user_data);
  response.render('result', { data: user_data})
  console.log("its working");
});

//**** form route: take data********
app.post('/back', function(request, response) {

  response.redirect('/')
  console.log("we are redirecting to index");
});

//******3 Call the listen function
// Tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})

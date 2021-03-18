const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');


mongoose.connect('mongodb+srv://traveloport:traveloport@cluster0.ysnri.mongodb.net/TravelOPort?retryWrites=true&w=majority', {
	// shell script -> mongo ds211708.mlab.com:11708/heroku_sqh7jf9g -u jugal -p jugaljoshi96
	//mongodb://jugal:jugaljoshi96@ds211708.mlab.com:11708/heroku_sqh7jf9g
	//mongodb://localhost:27017/project
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const port = process.env.PORT || 3001; //TODO change to 3001

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://traveloport.herokuapp.com'); //TODO change it to origninal url https://wbdv-flights-client.herokuapp.com || http://localhost:3000
	res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: 'defcon123'
	})
);

require('./Controller/users.controller.server')(app);
require('./Controller/testController')(app);
require('./Controller/currency.controller.server')(app);

app.listen(port, function() {
	console.log(`Server Listening on port ${port}`);
});

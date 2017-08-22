/* ************************************************************************ */
/*
    Database Connection and Model Management                                   

    Mongoose Setup

    Based on our run-time environment choose the appropriate 
    parameters for connecting to the database
*/
const env = 'localhost';
//const env = 'pcmongodb';
//const env = 'usemlab';

var config = require('../mongo-config.json')[env];

console.log('env         = ' + env);
console.log('MONGODB_URI = ' + config.MONGODB_URI);

var mongoose = require('mongoose');

// satisfy the deprecation warning
var Promise = require('bluebird');
mongoose.Promise = Promise;

// this object will contain the model(s) and references
// to `mongoose` and it's connection status.
var db = {};

// current environment
db.env = env;

// The model(s)...
db.TestModel   = require('./testdoc.js');
// add more models as needed, save them in `db.ModelName` for
// access in the rest of the application.

// These are nice to have available elsewhere
db.mongoose = mongoose;
db.conn = mongoose.connection;

mongoose.connect(config.MONGODB_URI, {useMongoClient: true}, function(err, data){
	if(err)
	    console.log(err);
	else{
	    console.log('Mongoose connection success');
	    db.connflag = true;
	}  
});

// Show any mongoose errors
db.conn.on('error', function(error) {
    console.log('Mongoose Error: ', error);
    throw error;
});

// export to the caller...
module.exports = db;

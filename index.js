/* ************************************************************************ */
/*

    To run this on the Tessel 2 :

    >t2 run index.js --compress=false --full=true
*/
/*
    For triggering and handing events
*/
const events = require('events');
const eventEmitter = new events.EventEmitter();
// we'll trigger an event after the database has been opened.
eventEmitter.once('dbReady', dbReady);

miscInfo();

/*
    Set up the database with our models
*/
var db = require('./models');

/*  
    Listen on the port that was configured for us
*/
db.conn.once('open', function() {
    console.log('================================================');
    console.log('index.js - success, database is open via mongoose');
    console.log('================================================');
    eventEmitter.emit('dbReady');
});

// event handler
function dbReady() {
    console.log('index.js - dbReady, writing some documents to the database...');
    
    for(var ix = 0;ix < 5;ix++) {

        var newTestDoc = {
            content: 'This is a test - ' + ix,
            env: db.env
        };
        
        var tmp = new db.TestModel(newTestDoc);
        tmp.save(function (err, doc) {
            if (err) throw err;
            else console.log('added - '+JSON.stringify(doc));
        });
    }
    console.log('Done!?');
    console.log('================================================');
};

// miscellaneous information...
function miscInfo() {

    const os = require('os');

    console.log('release  = ' + os.release());
    console.log('type     = ' + os.type());

    console.log('totalmem = ' + os.totalmem());
    console.log('freemem  = ' + os.freemem());

    console.log('homedir  = ' + os.homedir());
};

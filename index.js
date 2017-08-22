/* ************************************************************************ */
/*

    To run this on the Tessel 2 :

    >t2 run index.js --full=true
*/
/*
    For triggering and handing events
*/
const events = require('events');
const eventEmitter = new events.EventEmitter();
// we'll trigger an event after the database has been opened.
eventEmitter.once('dbReady', dbReady);
eventEmitter.once('dbDone', dbDone);

//miscInfo();

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

    const max = 5;

    for(var ix = 0;ix < max;ix++) {

        var newTestDoc = {
            content: 'This is a test - ' + ix,
            env: db.env,
            ix: ix
        };

        var tmp = new db.TestModel(newTestDoc);
        tmp.save(function (err, doc) {
            if (err) throw err;
            else console.log('added - '+JSON.stringify(doc));

            if((doc.ix+1) >= max) eventEmitter.emit('dbDone');
        });
    }
    console.log('Done!?');
    console.log('================================================');
};

function dbDone() {

    console.log('index.js - dbDone, retrieving all documents with env = ' + db.env);

    db.TestModel.find({'env': db.env})
    .exec(function (err, docs) {
        if(err) throw err;
        console.log('index.js - dbDone, found - ');
        console.log(JSON.stringify(docs, null, 2));
    });
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

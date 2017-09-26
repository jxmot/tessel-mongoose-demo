# tessel-mongoose-demo

* [Overview](#overview)
    * [Skip to the End](#skip-to-the-end)
    * [History](#history)
* [Requirements](#requirements)
* [Running the Application](#running-the-application)
    * [Sanity Check](#sanity-check)
    * [Running on the Tessel](#running-on-the-tessel)



# Overview

This is a demonstration of using the NodeJS package `mongoose` on a **Tessel 2**. This application will create five MongoDB documents in a collection named **`testdocs`**. After all five documents have been created the application will read *all* documents where the `env` field matches the current *environment*.

This document tries to explain things in a manner suitable to most any skill level. However *some* assumptions regarding the reader are made - 

* They are a proud owner of at least one **Tessel 2**.
* They have knowledge of what *MongoDB* is.
* They want to use MongoDB *with* Mongoose in their own application and need somewhere to start. 
* They might have been having difficulty getting `mongoose` to work correctly.

## Skip to the End

If you're looking for the quick solution to running a `mongoose` enabled application on the Tessel 2 then you will need to add `--full=true` to the `t2` command. For example - 

`t2 run index.js` **<- this will not work**

`t2 run index.js` **`--full=true`** **<- success!**

The *catch* is that you need to be using version 0.1.14 (*or newer*) of the Tessel 2 CLI.

## History

This project is derived from the steps I've been taking to create a Node.js/Express.js/handlebars/mongoose/mongodb project for the **Tessel 2**. The purpose of which is to determine the limitations of the Tessel 2 environment. And to explore the possibility of a work around for the limitations I find.

# Requirements

Before continuing please read through this document and have - 

* A Tessel 2 - The following *must* be completed before continuing :
    * You should already have connected your Tessel 2 to your PC and have completed the initialization steps as described in the Tessel 2 documentation(<https://tessel.github.io/t2-start/>).
    * Completed the "blinky" exercise and and have it working.
* NodeJS and npm installed on your PC. I recommend 6.10.2 / 3.10.10
* Tessel versions - 
    * t2-cli: **0.1.14** or newer, do not use older versions.
    * t2-firmware: 0.1.0
    * Node.js: 6.10.3
* MongoDB - I'm running MongoDB on my PC, however an mLab database will also work.

# Running the Application

Before you run this application you should have access to a MongoDB database. And you will need to make some minor changes to a couple of the files.

## Sanity Check

First we'll run the application on your PC, that's so we can be sure that your MongoDB is set up correctly. Here are the steps - 

**1) Initialize -** Run 'npm install' from within the `tessel-mongoose-demo` folder.

**2) Configure the database connection -** Use an editor and open the `mongo-config.json` file. The current file looks like this - 

```json
{
    "localhost": {
        "MONGODB_URI": "mongodb://localhost/tessel_mongoose_test_db"
    },
    "pcmongodb": {
        "MONGODB_URI": "mongodb://192.168.0.8/tessel_mongoose_test_db"
    },
    "usemlab": {
        "MONGODB_URI": "mongodb://<dbuser>:<dbpassword>@<deployment>.mlab.com:<dbport>/<database>"
    }
}
```

Under `"pcmongodb"` change the IP address in `"MONGODB_URI"` to the address of your PC. However if your using an mLab database then change the URI under`"usemlab"`. 

**Save the file.**

**3) Select the environment -** If you are using an mLab database and **not** using MongoDB hosted on your PC then open `/models/index.js` in your editor. At the top of the file - 

```javascript
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

```

Change the code to look like - 

```javascript
//const env = 'localhost';
//const env = 'pcmongodb';
const env = 'usemlab';
```

**Save the file.**

**4) Run -** Run the application with `node index.js`. You should see output that looks something like this - 

```
env         = localhost
MONGODB_URI = mongodb://localhost/tessel_mongoose_test_db
Mongoose connection success
================================================
index.js - success, database is open via mongoose
================================================
index.js - dbReady, writing some documents to the database...
Done!?
================================================
added - {"__v":0,"content":"This is a test - 0","env":"localhost","ix":0,"_id":"599bd3eab898783f30292f90","epochdate":1503384554217,"date":"2017-08-22T06:49:14.217Z"}
added - {"__v":0,"content":"This is a test - 1","env":"localhost","ix":1,"_id":"599bd3eab898783f30292f91","epochdate":1503384554222,"date":"2017-08-22T06:49:14.222Z"}
added - {"__v":0,"content":"This is a test - 2","env":"localhost","ix":2,"_id":"599bd3eab898783f30292f92","epochdate":1503384554222,"date":"2017-08-22T06:49:14.222Z"}
added - {"__v":0,"content":"This is a test - 3","env":"localhost","ix":3,"_id":"599bd3eab898783f30292f93","epochdate":1503384554222,"date":"2017-08-22T06:49:14.222Z"}
added - {"__v":0,"content":"This is a test - 4","env":"localhost","ix":4,"_id":"599bd3eab898783f30292f94","epochdate":1503384554223,"date":"2017-08-22T06:49:14.223Z"}
index.js - dbDone, retrieving all documents with env = localhost
index.js - dbDone, found -
[
  {
    "_id": "599bd3eab898783f30292f90",
    "content": "This is a test - 0",
    "env": "localhost",
    "ix": 0,
    "__v": 0,
    "epochdate": 1503384554217,
    "date": "2017-08-22T06:49:14.217Z"
  },
  {
    "_id": "599bd3eab898783f30292f92",
    "content": "This is a test - 2",
    "env": "localhost",
    "ix": 2,
    "__v": 0,
    "epochdate": 1503384554222,
    "date": "2017-08-22T06:49:14.222Z"
  },
  {
    "_id": "599bd3eab898783f30292f91",
    "content": "This is a test - 1",
    "env": "localhost",
    "ix": 1,
    "__v": 0,
    "epochdate": 1503384554222,
    "date": "2017-08-22T06:49:14.222Z"
  },
  {
    "_id": "599bd3eab898783f30292f93",
    "content": "This is a test - 3",
    "env": "localhost",
    "ix": 3,
    "__v": 0,
    "epochdate": 1503384554222,
    "date": "2017-08-22T06:49:14.222Z"
  },
  {
    "_id": "599bd3eab898783f30292f94",
    "content": "This is a test - 4",
    "env": "localhost",
    "ix": 4,
    "__v": 0,
    "epochdate": 1503384554223,
    "date": "2017-08-22T06:49:14.223Z"
  }
]
```

## Running on the Tessel

**1)** If you were running MongoDB on your PC then you will need to edit the `/models/index.js` file.  Change the first lines of code to be - 

```javascript
//const env = 'localhost';
const env = 'pcmongodb';
//const env = 'usemlab';
```

Otherwise if you're using mLab then it's not necessary to change anything.

**Save the file.**

**2)** In order for this application to run on the Tessel 2 you need to add `--full=true` to the command. For example - 

`t2 run index.js` **<- will not work**

`t2 run index.js` **`--full=true`** **<- success!**

You *should* see output that is similar to the output that was created while running on Node on your PC.

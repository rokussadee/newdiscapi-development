const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoose = require('mongoose')

const username = encodeURIComponent(process.env.MONGO_USERID);

const userpass = encodeURIComponent(process.env.MONGO_USERPASS);

const database = encodeURIComponent(process.env.MONGODB_DB)

//const uri = `mongodb://${username}:${userpass}@db:27017/${database}`;
const uri = `mongodb://localhost:27017/${database}`

mongoose.createConnection(
  uri,
  {
    "auth": {
      "authSource":"admin"
    },
    "user":username,
    "pass":userpass,
  }
)

let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, function(err, database) {
   db = database;
   console.log(db); // shows stuff
});

module.exports = {
  db
}

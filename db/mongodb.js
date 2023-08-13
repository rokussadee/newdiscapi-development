// source: https://github.com/vercel/next.js/discussions/31416#discussioncomment-1754211

/**
 * @abstract This script handles the database connection and ensures connections are reused.
 */
const { MongoClient } = require('mongodb');

const { MONGO_USERPASS, MONGO_USERID, MONGODB_DB } = process.env


if (!MONGO_USERID) {
  throw new Error(
    'Please define the MONGO_USERID environment variable inside .env.local'
  )
}

if (!MONGO_USERPASS) {
  throw new Error(
    'Please define the MONGO_USERPASS environment variable inside .env.local'
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

//const MONGODB_URI = `mongodb://${MONGO_USERID}:${MONGO_USERPASS}@db:27017/${MONGODB_DB}`
const MONGODB_URI = `mongodb://mongodb:27017`

const mongoose = require('mongoose');

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


module.exports = mongoose;


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
//let cached = global.mongo
//
//if (!cached) {
//	console.log('mongodb connection not established')
//  cached = global.mongo = { conn: null, promise: null }
//}
//
//const connectToDatabase = async () => {
//
//  console.log(MONGODB_URI)
//
//  if (cached.conn) {
//	  console.log('mongodb connection cached')
//    return cached.conn
//  }
//
//  if (!cached.promise) {
//    const opts = {
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//    }
//
//    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
//      console.log('mongodb connection created')
//      return {
//        client,
//        db: client.db(MONGODB_DB),
//      }
//    })
//  }
//  cached.conn = await cached.promise
//  return cached.conn
//}
//
//module.exports = {
//  connectToDatabase
//}

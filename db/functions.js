
//const {connectToDatabase} = require('../db/mongodb.js');
const mongoose = require('../db/mongodb.js');

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  id: Number,
  img: String,
  wishlist: Array
}, {
  collection: 'users'
});

const User = mongoose.model('User', UserSchema);

async function findAllUsers() {
  try {
  User.find({}).exec()
  .then(users => { 
    return users
  })
  } catch(err) {
  console.log(err)
  }
}

async function insertUser(user) {
  try {
    const newUser = new User({
      ...user
    })
    newUser.save()
    .then(insertedUser => {
          return insertedUser
    })
  } catch(err) {
    console.log(err)
  }
}

async function findUserById(user_id) {
  try {
    User.findById(user_id)
    .then(foundUser => {
      if (foundUser) return foundUser
    })

  } catch(err) {
    console.log(err)
  }
}

async function pushToWishlist(user_id, item_link) {
  try{  
    User.updateOne({id: user_id}, {$push: {['wishlist']: item_link}})
    .then(updatedUser => {
      if(updatedUser.nModified > 0) {
        console.log('user wishlist updated')
        return updatedUser
      }
    })
  } catch(err) {
    console.log(err)
  }
}

async function pullFromWishlist(user_id, item_link) {
  try{
    User.updateOne({id: user_id}, {$pull: {['wishlist']: item_link}})
    .then(updatedUser => {
      if(updatedUser.nModified > 0) {
        console.log('user wishlist updated')
        return updatedUser
      }
    })
  } catch(err) {
    console.log(err)
  }
}

async function findUserWishlist(user_id) {
  try{
    User.findById(user_id)
    .then(foundUser => {
      if (foundUser) return foundUser.wishlist
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports = {
  findAllUsers,
  insertUser,
  findUserById,
 pushToWishlist,
  pullFromWishlist,
  findUserWishlist
}

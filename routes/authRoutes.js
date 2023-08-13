const express = require('express')
const router = express.Router()
const querystring = require('querystring')

const { loginUser, spotifyUserCreation } = require('../controllers/authentication.controller.js')

router.get('/login', loginUser);

router.get('/logged', spotifyUserCreation);


module.exports = router;

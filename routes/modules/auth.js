const express = require('express')
const router = express.Router()

const passport= require('passport')

// login(facebook)
router.get('/facebook', passport.authenticate('facebook', {
  scope:['email', 'public_profile']
}))

// login-post(facebook)
router.post('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router
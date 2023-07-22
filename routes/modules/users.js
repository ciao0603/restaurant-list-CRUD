const express = require('express')
const router = express.Router()

const User = require('../../models/user')
const passport = require('passport')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// login-post
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register
router.get('/register', (req, res) => {
  res.render('register')
})

// register-post
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('user exist')
        return res.render('login')
      }
      return User
        .create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router
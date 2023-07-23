const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const User = require('../models/user')

module.exports = (app) => {
  // passport初始化
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User
      .findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'can not find user' })
        }
        return bcrypt
          .compare(password, user.password) //hash要放後面
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { message: 'email or password incorrect' })
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, false))
  }))
  // 序列化和反序列化
  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    User
      .findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
module.exports = {
  authenticator: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next()
    }
    console.log('bad')
    req.flash('warning_msg', '請先登入才可使用')
    res.redirect('/users/login')
  }
}
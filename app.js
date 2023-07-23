// 待解決: 刪除功能 => 路由可連接，但跑不出來
// 載入相關套件
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

const usePassport = require('./config/passport')
const routes = require('./routes')
const app = express()
const port = 3000

require('./config/mongoose')

// 設定view引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 套入靜態css
app.use(express.static('public'))
// 載入body-parser
app.use(express.urlencoded({ extended: true }))
// 載入method-override
app.use(methodOverride('_method'))
// 設定session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 呼叫passport
usePassport(app)
// 載入flash-message
app.use(flash())
// 依登入狀態切換導覽列(login、logout)，交接狀態(req>res)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 設定路由
app.use(routes)

// 監聽伺服器
app.listen(port, () => {
  console.log(`Running on localhost:${port}`)
})
// 待解決: 刪除功能 => 路由可連接，但跑不出來
// 載入相關套件
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const Data = require('./models/restaurant')
const routes = require('./routes')
const app = express()
const port = 3000
// 非正式環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// 連接mongoDB
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection // 取得連線狀態
db.on('error', () => {
  console.log('mongoDB error')
})
db.once('open', () => {
  console.log('mongoDB connected')
})

// 設定view引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 套入靜態css
app.use(express.static('public'))
// 載入body-parser
app.use(express.urlencoded({extended: true}))
// 載入method-override
app.use(methodOverride('_method'))

// 設定路由
app.use(routes)

// 監聽伺服器
app.listen(port, () => {
  console.log(`Running on localhost:${port}`)
})
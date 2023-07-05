// 載入相關套件
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Data = require('./models/restaurant')
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

// 設定路由
// 瀏覽
app.get('/', (req, res) => {
  Data.find()
    .lean()
    .then(datas => res.render('index', {datas}))
    .catch(error => console.log(error))
})
// 簡介
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Data.findById(id)
    .lean()
    .then(data => res.render('show', { data }))
    .catch(error => console.log(error))
})
// 編輯-get
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Data.findById(id)
    .lean()
    .then(data => res.render('edit', { data }))
    .catch(error => console.log(error))
})
// 編輯-post
app.post('/restaurants/:id/edit', (req, res) => {
const id = req.params.id
const name = req.body.name
const category = req.body.category
const location = req.body.location
const google_map = req.body.google_map
const phone = req.body.phone
const description = req.body.description
const image = req.body.image

Data.findById(id)
  .then(data => {
    data.name = name
    data.category = category
    data.location = location
    data.google_map = google_map
    data.phone = phone
    data.description = description
    data.image = image
    return data.save()
  })
  .then(() => res.redirect(`/restaurants/${id}`))
  .catch(error => console.log(error))
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`Running on localhost:${port}`)
})
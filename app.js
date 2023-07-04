// 載入相關套件
const express = require('express')
const mongoose = require('mongoose')
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


// 設定路由
app.get('/', (req, res) => {
  res.send('good')
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`Running on localhost:${port}`)
})
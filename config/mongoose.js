const mongoose = require('mongoose')

// 連接mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection // 取得連線狀態
db.on('error', () => {
  console.log('mongoDB error')
})
db.once('open', () => {
  console.log('mongoDB connected')
})

module.exports = db
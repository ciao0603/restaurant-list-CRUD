const mongoose = require('mongoose')
const Data = require('../restaurant')
const dataList = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('mongoDB error')
})
db.once('open', () => {
  console.log('mongoDB connected')
  Data.create(dataList)
    .catch(error => console.log(error))
  console.log('done')
})

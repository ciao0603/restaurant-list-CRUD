const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 定義資料結構
const dataSchema = new Schema ({
  name: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String
  },
  location: {
    type: String
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  rating: {
    type: Number
  },
  description: {
    type: String
  },
})
// model轉套件
module.exports = mongoose.model('Data', dataSchema)
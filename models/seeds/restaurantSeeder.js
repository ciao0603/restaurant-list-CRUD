const db = require('../../config/mongoose')

const Data = require('../restaurant')
const dataList = require('../../restaurant.json').results

db.once('open', () => {
  Data.create(dataList)
    .catch(error => console.log(error))
  console.log('done')
})

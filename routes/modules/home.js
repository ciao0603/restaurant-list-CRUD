const express = require('express')
const Data = require('../../models/restaurant')
const router = express.Router()

router.get('/', (req, res) => {
  Data.find()
    .lean()
    .then(datas => res.render('index', { datas }))
    .catch(error => console.log(error))
})

module.exports = router
const express = require('express')
const Data = require('../../models/restaurant')
const router = express.Router()

// 搜尋
router.get('/search', (req, res) => {
  const KEYWORD = req.query.keyword
  const keyword = KEYWORD.toLowerCase()
  Data.find()
    .lean()
    .then(restaurantList => restaurantList.filter(restaurant => restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)))
    .then(datas => res.render('index', { datas, KEYWORD }))
    .catch(error => console.log(error))
})
// 新增-get(一定要放路由:id前面)
router.get('/new', (req, res) => {
  res.render('new')
})
// 新增-post
router.post('', (req, res) => {
  const restaurant = {
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  }
  Data.create(restaurant)
    .then(data => res.redirect('/'))
    .catch(error => console.log(error))
})
// 簡介
router.get('/:id', (req, res) => {
  const id = req.params.id
  Data.findById(id)
    .lean()
    .then(data => res.render('show', { data }))
    .catch(error => console.log(error))
})
// 編輯-get
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Data.findById(id)
    .lean()
    .then(data => res.render('edit', { data }))
    .catch(error => console.log(error))
})
// 編輯-post
router.put('/:id', (req, res) => {
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
// 刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Data.findById(id)
    .then(data => console.log('found by id'))
    .then(data => data.remove())
    .then(data => console.log('removed'))
    .then(data => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
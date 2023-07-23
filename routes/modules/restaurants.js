const express = require('express')
const Data = require('../../models/restaurant')
const router = express.Router()

// 搜尋
router.get('/search', (req, res) => {
  const KEYWORD = req.query.keyword
  const keyword = KEYWORD.toLowerCase()
  const userId = req.user._id
  Data.find({ userId })
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
  const { name, category, image, location, phone, google_map, rating, description } = req.body
  const userId = req.user._id
  const restaurant = { name, category, image, location, phone, google_map, rating, description, userId }
  Data.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
// 簡介
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Data.findOne({ _id, userId})
    .lean()
    .then(data => res.render('show', { data }))
    .catch(error => console.log(error))
})
// 編輯-get
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Data.findOne({ _id, userId })
    .lean()
    .then(data => res.render('edit', { data }))
    .catch(error => console.log(error))
})
// 編輯-post
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, category, image, location, phone, google_map, description } = req.body

  Data.findOne({ _id, userId })
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
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})
// 刪除
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Data.findOne({ _id, userId })
    .then(data => data.deleteOne({ _id: "id" }))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
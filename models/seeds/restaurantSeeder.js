const bcrypt = require('bcryptjs')

const db = require('../../config/mongoose')

const Data = require('../restaurant')
const User = require('../user')
const dataList = require('../../restaurant.json').results
const SEED_USER = require('../../user')


db.once('open', async () => {
  try {
    for (let seedUser of SEED_USER) {
      // create user
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(seedUser.password, salt)
      const user = await User.create({
        email: seedUser.email,
        password: hash
      })
      // create restaurant by userId
      const userId = user._id
      for (let i = seedUser.startIndex - 1; i < seedUser.endIndex; i++) {
        const newData = dataList[i]
        newData.userId = `${userId}`
        await Data.create(newData)
      }
    }
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
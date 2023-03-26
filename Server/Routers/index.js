const express = require('express')
const auth = require('./auth')
const user = require('./user')
const product = require('./product')
const favorite = require('./favorite')
const store = require('./store')
const order = require('./order')
const address = require('./address')
const bankCard = require('./bankCard')
const banner = require('./banner')
const comment = require('./comment')
const category = require('./category')

const router = express.Router()

router.use('/auth' ,auth)

router.use('/user' ,user)

router.use('/products' ,product)

router.use('/favorites' ,favorite)

router.use('/store' ,store)

router.use('/orders' ,order)

router.use('/address' ,address)

router.use('/bankCards' ,bankCard)

router.use('/banners' ,banner)

router.use('/comments' ,comment)

router.use('/categories' ,category)


module.exports = router
const express = require('express')
const { changeEmail ,changePassword} = require('../Controllers/user')
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const router = express.Router()

router.use(getAccessToRoute)


router.post("/changeEmail" , changeEmail)

router.post("/changePassword" , changePassword)

module.exports = router
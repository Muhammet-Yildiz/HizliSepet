const express = require('express')
const { register, login, getActiveUser  , logout } = require('../Controllers/auth')
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const router = express.Router()


router.post("/register" , register)

router.post("/login" , login)

router.get("/logout" , getAccessToRoute, logout)

router.get("/activeUser" ,getAccessToRoute , getActiveUser)


module.exports = router
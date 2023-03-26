
const express = require('express');
const {editBankCard,deleteBankCard, addBankCard,getAllBankCards} = require('../Controllers/bankCard');
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const router = express.Router();

router.use(getAccessToRoute)

router.get('/all' , getAllBankCards)

router.post("/add" , addBankCard)

router.put("/edit/:id" , editBankCard)

router.delete("/delete/:id" , deleteBankCard)


module.exports = router;
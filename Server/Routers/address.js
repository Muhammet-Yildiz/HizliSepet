const express = require('express');
const {addAddress,editAddress,deleteAddress,getAllAddresses} = require('../Controllers/address');
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const router = express.Router();

router.use(getAccessToRoute)

router.get('/all' , getAllAddresses)

router.post('/add' , addAddress)

router.put("/edit/:id" , editAddress)

router.delete("/delete/:id" , deleteAddress)

module.exports = router;
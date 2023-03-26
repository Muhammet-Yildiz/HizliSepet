
const express = require('express');
const { getAllBaskettems ,addToBasket ,increaseQuantity,decreaseQuantity,deleteAllBasketItems ,deleteBasketItem ,getAllDeliveryItems} = require('../Controllers/store');
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const router = express.Router();

router.use(getAccessToRoute)


router.post("/addToBasket" , addToBasket)

router.get('/getAllBasketItems',getAllBaskettems)

router.post('/increaseQuantity' , increaseQuantity)

router.post('/decreaseQuantity' , decreaseQuantity)

router.delete('/deleteAllBasketItems' , deleteAllBasketItems)

router.delete('/deleteBasketItem/:itemId' , deleteBasketItem)

router.get('/getAllDeliveryItems',getAllDeliveryItems)


module.exports = router;
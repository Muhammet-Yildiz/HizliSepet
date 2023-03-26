
const express = require('express');
const { completeOrder ,getAllMyOrders,getOrderDetails  ,getAllEvaluatableItems, getAllApprovedEvaluatableItems} = require('../Controllers/order');
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const router = express.Router();

router.use(getAccessToRoute)


router.post('/completeOrder' , completeOrder)

router.get("/getAllMyOrders" , getAllMyOrders)

router.get("/detail/:id" , getOrderDetails)

router.get("/getAllEvaluatableItems" , getAllEvaluatableItems)

router.get("/getAllApprovedEvaluatableItems" , getAllApprovedEvaluatableItems)


module.exports = router;
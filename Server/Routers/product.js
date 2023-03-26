const express = require('express');
const { addProduct,addImageForProduct ,getAllProducts ,getDetailProduct ,editProduct,lastViewedProducts, getProductsInSameSubCategory ,getRecommendationsForItemsInBasket,getSuggestedSearchWords ,searchProduct } = require('../Controllers/product');
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const imageUpload = require('../Helpers/Libraries/imageUpload');

const router = express.Router();


router.get('/all',getAllProducts)

router.post("/add" , addProduct)

router.get("/:id/detail" , getAccessToRoute,getDetailProduct)

router.post("/:id/addImage" , [imageUpload.single("product_image")]
,addImageForProduct)

router.put("/edit/:id" ,editProduct)

router.get("/lastViewed/all", getAccessToRoute , lastViewedProducts)

router.get("/:id/inSameSubCategory",  getProductsInSameSubCategory)

router.get("/recommendationsForItemsInBasket", getAccessToRoute, getRecommendationsForItemsInBasket)

router.get("/suggestedSearchWords/all", getSuggestedSearchWords)

router.post('/search',searchProduct)


module.exports = router;
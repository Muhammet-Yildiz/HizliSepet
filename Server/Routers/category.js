
const express = require('express');
const {addCategory,getAllCategories,getAllSubCategories,addSubCategory} = require('../Controllers/category');
const imageUpload = require('../Helpers/Libraries/imageUpload');
const router = express.Router();


router.get('/all' , getAllCategories)

router.post("/add" , imageUpload.single("category_image") ,addCategory)

router.get('/allSubCategories' , getAllSubCategories)

router.post("/:categoryId/add" , imageUpload.single("subCategory_image") ,addSubCategory)


module.exports = router;
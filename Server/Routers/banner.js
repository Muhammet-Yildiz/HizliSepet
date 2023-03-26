
const express = require('express');
const {addBanner,getAllBanners} = require('../Controllers/banner');
const imageUpload = require('../Helpers/Libraries/imageUpload');
const router = express.Router();


router.get('/all' , getAllBanners)

router.post("/add" , [imageUpload.single("banner_image")] ,  addBanner)


module.exports = router;
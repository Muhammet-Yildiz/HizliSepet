const express = require('express');
const { getAllFavoriteItems,addItemToFavoritelist,removeItemFromFavoritelist } = require('../Controllers/favorite');
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

const router = express.Router();


router.get('/all',getAccessToRoute , getAllFavoriteItems)

router.post("/:id/add" ,getAccessToRoute , addItemToFavoritelist)

router.delete("/:id/remove" ,getAccessToRoute , removeItemFromFavoritelist)


module.exports = router;

const express = require('express');
const {addComment,getAllComments ,editComment ,deleteComment} = require('../Controllers/comment');
const router = express.Router();
const { getAccessToRoute } = require('../Middlewares/Authorization/auth')

router.use(getAccessToRoute)


router.get("/all" , getAllComments)

router.post("/add" , addComment)

router.put("/edit" , editComment)

router.post("/delete" , deleteComment)


module.exports = router;
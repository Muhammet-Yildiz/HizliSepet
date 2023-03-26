const asyncErrorWrapper = require("express-async-handler");
const User = require("../Models/user");
const Product = require("../Models/product");

const getAllFavoriteItems = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id)
        .select('')
        .populate({
            path: "likedProducts",
            select: "name price about images sizes seller averageRating comments"
        })
        
        return  res.status(200).json({
            success: true,
            favorites: user.likedProducts
        })

})

const addItemToFavoritelist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    const activeUser = await User.findById(req.user.id);

    product.likes.unshift(req.user.id);
    product.likeCount = product.likes.length;
    activeUser.likedProducts.unshift(id);
    
    await activeUser.save();
    await product.save();

    return res.status(200).json({
        success: true,
        product
    });
});


const removeItemFromFavoritelist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    const activeUser = await User.findById(req.user.id);

    const index = product.likes.indexOf(req.user.id);
    product.likes.splice(index, 1);
    product.likeCount = product.likes.length;
    activeUser.likedProducts.splice(activeUser.likedProducts.indexOf(id), 1);
    await activeUser.save();
    await product.save();

    return res.status(200).json({
        success: true,
        message: "item removed from favorite list"
    });

})



module.exports = {
    getAllFavoriteItems,
    addItemToFavoritelist,
    removeItemFromFavoritelist
}
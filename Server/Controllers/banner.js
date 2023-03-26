const asyncErrorWrapper = require("express-async-handler");
const Banner = require("../Models/banner")

const getAllBanners = asyncErrorWrapper(async (req, res, next) => {
    
        const banners = await Banner.find();
    
        return res.status(200).json({
            success: true,
            banners
        });
    }
);

const addBanner = asyncErrorWrapper(async (req, res, next) => {

    const {bannerName , shippingTime ,deliveryTime  } = req.body;

    const newBanner = await Banner.create({
        name : bannerName,
        shippingTime,
        deliveryTime,
        image : req.savedImage
    });

    return res.status(200).json({
        success: true,
        newBanner
    });
});


module.exports = {
    addBanner  ,
    getAllBanners,
}
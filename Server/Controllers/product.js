const asyncErrorWrapper = require("express-async-handler");
const Product = require("../Models/product");
const Lastviewed = require("../Models/lastviewed");
const Order = require("../Models/order");
const Orderitem = require("../Models/orderitem");
const Category = require("../Models/category");
const Banner = require("../Models/banner");

const getAllProducts = asyncErrorWrapper(async (req, res, next) => {
    const products = await Product.find().populate('banner').populate({
        path: 'subCategory',
        select: 'name'
    })
    res.status(200).json({
        success: true,
        length: products.length,
        products,
    });
});


const addProduct = asyncErrorWrapper(async (req, res, next) => {

    const values = req.body;

    const banner = await Banner.findById(values.bannerId)

    const product = await Product.create({
        ...values,
        banner: banner._id
    })

    res.status(200).json({
        success: true,
        product
    });

})


const addImageForProduct = asyncErrorWrapper(async (req, res, next) => {

    const product_id = req.params.id;

    const product = await Product.findById(product_id)

    product.images = [...product.images, req.savedImage]

    await product.save()

    return res.status(200).json({
        success: true,
        message: "image upload successfull",
        product
    })

})


const getDetailProduct = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const product = await Product.findById(id).populate('banner').populate('comments', 'rating content user nameVisible created_at orderItem').populate({
        path: 'comments',
        populate: {
            path: 'user',
            select: 'username'
        }
    }).populate({
        path: 'comments',
        populate: {
            path: 'orderItem',
            select: 'selectedSize'
        }
    }).populate({
        path: 'subCategory',
        select: 'name'
    })

    let colorOptions = await Product.find({ code: product.code }).select('name images')

    if (colorOptions.length === 1) {
        colorOptions = null
    }

    const lastvieweds = await Lastviewed.findOne({ user: req.user.id }).populate('products')

    if (lastvieweds) {

        const productIds = lastvieweds.products.map(product => product._id.toString())

        if (!productIds.includes(product._id.toString())) {
            lastvieweds.products = [product._id, ...lastvieweds.products]
        }
        else {

            const index = productIds.indexOf(product._id.toString())
            lastvieweds.products.splice(index, 1)

            lastvieweds.products = [product._id, ...lastvieweds.products]

        }
        await lastvieweds.save()
    }
    else {
        await Lastviewed.create({
            user: req.user.id,
            products: [product._id]
        })
    }

    return res.status(200).json({
        success: true,
        colorOptions,
        product
    })

})


const editProduct = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const values = req.body;
    const banner = await Banner.findById(values.bannerId)

    if (values.bannerId && banner) {
        values.banner = banner._id
    }
    const editedProduct = await Product.findByIdAndUpdate(id, {
        ...values,
    }, {
        new: true,
        runValidators: true
    })
    return res.status(200).json({
        success: true,
        editedProduct
    })
})

const lastViewedProducts = asyncErrorWrapper(async (req, res, next) => {

    const lastVieweds = await Lastviewed.findOne({ user: req.user.id }).populate({
        path: 'products',
        select: 'name images price seller averageRating comments sizes'
    }).limit(10)


    return res.status(200).json({
        success: true,
        lastVieweds,
    })
})

const getProductsInSameSubCategory = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const products = await Product.find({ subCategory: id })

    return res.status(200).json({
        success: true,
        products

    })

})

const getRecommendationsForItemsInBasket = asyncErrorWrapper(async (req, res, next) => {

    const order = await Order.findOne({ user: req.user.id, complete: false })

    const orderItems = await Orderitem.find({ order: order._id, orderStatus: false }).populate({
        path: 'product',
        select: 'subCategory'
    })

    const productIds = orderItems.map(orderItem => orderItem.product._id.toString())

    const subCategoryIds = [...new Set(orderItems.map(orderItem => orderItem.product.subCategory._id.toString()))]

    const products = await Product.find({ subCategory: { $in: subCategoryIds } }).select('name images price seller averageRating comments sizes').limit(10)

    const filteredProducts = products.filter(product => !productIds.includes(product._id.toString()))

    return res.status(200).json({
        success: true,
        products: filteredProducts
    })

})

const getSuggestedSearchWords = asyncErrorWrapper(async (req, res, next) => {

    const allOptions = []

    const banners = await Banner.find().select('name image ')

    const bannerOptions = banners.map(banner => {
        return {
            name: banner.name,
            bannerImage: banner.image,
            type: 'banner'
        }

    })

    allOptions.push(...bannerOptions)

    const categories = await Category.find().select('name subCategories').populate('subCategories', 'name')

    categories.map(category => {

        const result = category.subCategories.map(subCategory => {
            return {
                name: subCategory.name,
                categoryName: category.name,
                type: 'category'
            }
        })
        allOptions.push(...result)

    })

    const products = await Product.find().select('name')

    const productOptions = products.map(product => {
        return {
            name: product.name,
            type: 'product'
        }
    })
    allOptions.push(...productOptions)

    return res.status(200).json({
        success: true,
        allOptions
    })

})

const searchProduct = asyncErrorWrapper(async (req, res, next) => {

    const { queryObj } = req.body

    let results;

    if (queryObj.type == 'category') {

        const allProducts = await Product.find().select('name images price  averageRating comments subCategory likes').populate({
            path: 'subCategory',
            select: 'name',
        })

        results = allProducts.filter(product => product.subCategory.name === queryObj.name)

    }
    else if (queryObj.type == 'product' || queryObj.type == 'random') {

        results = await Product.find({ name: { $regex: queryObj.name, $options: 'i' } }).select('name images price  averageRating comments subCategory likes seller')
    }

    else if (queryObj.type == 'banner') {
        const allProducts = await Product.find().select('name images price  averageRating comments banner likes seller ').populate({
            path: 'banner',
            select: 'name',
        })

        results = allProducts.filter(product => product.banner.name === queryObj.name)

    }

    if (results.length == 0) {

        results = await Product.find().select('name images price  averageRating comments subCategory likes seller').limit(20)

        return res.status(200).json({
            success: true,
            message: "Aramanız için ürün bulunamadı.  Aşagıdakiler ilginizi çekebilir.",
            results
        })
    }

    return res.status(200).json({
        success: true,
        results
    })

})

module.exports = {
    getAllProducts,
    getDetailProduct,
    addProduct,
    addImageForProduct,
    editProduct,
    lastViewedProducts,
    getProductsInSameSubCategory,
    getRecommendationsForItemsInBasket,
    getSuggestedSearchWords,
    searchProduct
}
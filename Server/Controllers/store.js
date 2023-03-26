const asyncErrorWrapper = require("express-async-handler");
const Order = require("../Models/order");
const CustomError = require("../Helpers/error/CustomError");
const OrderItem = require("../Models/orderitem");

const getAllBaskettems = asyncErrorWrapper(async (req, res, next) => {

    const order = await Order.findOne({ user: req.user.id, complete: false })
    const orderItems = await OrderItem.find({ order: order._id, orderStatus: false })
        .populate( "product", "name price images seller banner subCategory")
        .populate({
            path: "product",
            populate: {
                path: 'banner',
            }
        })
        .populate({
            path: "product",
            populate: {
                path: 'subCategory',
                select: 'name '
            }
        })
            

    

    const totalPrice = orderItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)

    return res.status(200).json({
        success: true,
        totalPrice,
        orderItems
    })

})

const addToBasket = asyncErrorWrapper(async (req, res, next) => {
    const { productId ,selectedSize } = req.body;
    
    if (!productId) {
        return next(new CustomError("Please provide a product id", 400))
    }

    const order = await Order.findOne({ user: req.user.id, complete: false })

    const orderItem = await OrderItem.findOne({
        product: productId, orderStatus: false,
        order: order._id,
        selectedSize: selectedSize
    })

    if (orderItem) {
        orderItem.quantity += 1;
        await orderItem.save()
    }
    else {
        const newOrderItem = await OrderItem.create({
            product: productId,
            order,
            quantity: 1,
            orderStatus: false,
            selectedSize: selectedSize
        })
        await newOrderItem.save()

        return res.status(200).json({
            success: true,
            orderItem: newOrderItem
        })

    }

    return res.status(200).json({
        success: true,
        orderItem
    })

})

const deleteBasketItem = asyncErrorWrapper(async (req, res, next) => {
    const {itemId} = req.params;
    const order = await Order.findOne({ user: req.user.id, complete: false })

    const orderItem = await OrderItem.findOne({
        _id: itemId,
        order: order._id,
        orderStatus: false
    })

    if (!orderItem) {
        return next(new CustomError("Order item not found", 400))
    }

    await orderItem.remove()

    return res.status(200).json({
        success: true,
        message: "Item removed from card"
    })

})

const deleteAllBasketItems = asyncErrorWrapper(async (req, res, next) => {

    const order = await Order.findOne({ user: req.user.id, complete: false })

    await OrderItem.deleteMany({ order: order._id, orderStatus: false })

    return res.status(200).json({
        success: true,
        message: "All items removed from card"
    })

})



const increaseQuantity = asyncErrorWrapper(async (req, res, next) => {
    const { itemId } = req.body;

    if (!itemId) {
        return next(new CustomError("Please provide a item id", 400))
    }
    const order = await Order.findOne({ user: req.user.id, complete: false })

    const orderItem = await OrderItem.findOne({
        _id: itemId,
        order: order._id,
        orderStatus: false
    })
    if (!orderItem) {
        return next(new CustomError("Order item not found", 400))
    }
    orderItem.quantity += 1;
    await orderItem.save()
    return res.status(200).json({
        success: true,
        message: "Quantity increased",
    })
})


const decreaseQuantity = asyncErrorWrapper(async (req, res, next) => {
    const { itemId } = req.body;

    if (!itemId) {
        return next(new CustomError("Please provide a product id", 400))
    }
    const order = await Order.findOne({ user: req.user.id, complete: false })

    const orderItem = await OrderItem.findOne({
        _id: itemId,
        order: order._id,
        orderStatus: false
    })
    if (!orderItem) {
        return next(new CustomError("Order item not found", 400))
    }
    orderItem.quantity -= 1;

    if (orderItem.quantity === 0) {
        await orderItem.remove()
        return res.status(200).json({
            success: true,
            message: "Order Item removed "
        })
    }
    await orderItem.save()

    return res.status(200).json({
        success: true,
        message: "Quantity increased",
    })
})


const getAllDeliveryItems = asyncErrorWrapper(async (req, res, next) => {

    const order = await Order.findOne({ user: req.user.id, complete: false })

    const orderItems = await OrderItem.find({ order: order._id, orderStatus: false }).select("quantity product selectedSize ")
    .populate({
        path: "product",
        select: "name price images seller banner",
        populate: {
            path: "banner",
        }
    })
   
    const productGroupSeller = orderItems.reduce((acc, item) => {
        const seller = item.product.seller
        if (!acc[seller]) {
            acc[seller] = {
                seller: item.product.seller,
                products: []
            }
        }
        acc[seller].products.push(item)
        return acc
    }, {})


    const totalPrice = orderItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity
    }, 0)

    return res.status(200).json({
        success: true,
        totalPrice,
        productGroupSeller
    })

})

module.exports = {
    addToBasket,
    getAllBaskettems,
    deleteBasketItem,
    deleteAllBasketItems,
    increaseQuantity,
    decreaseQuantity,
    getAllDeliveryItems,
}
const asyncErrorWrapper = require("express-async-handler");
const Order = require("../Models/order");
const OrderItem = require("../Models/orderitem");
const { v4: uuidv4 } = require('uuid');
const BankCard = require("../Models/bankCard");
const Address = require("../Models/address");
const Evaluation = require("../Models/evaluation");

const completeOrder = asyncErrorWrapper(async (req, res, next) => {

    const { selectedCard, selectedAddress } = req.body;

    const order = await Order.findOne({ user: req.user.id, complete: false })

    const orderItems = await OrderItem.find({ order: order._id, orderStatus: false })

    orderItems.forEach(async (item) => {
        item.orderStatus = true;
        item.date_added = Date.now();
        await item.save()
    })

    order.complete = true;
    order.dateOrdered = Date.now();

    if(selectedAddress._id) {
        order.orderAddress = selectedAddress;
    }
    else {
        const address = await Address.findOne({
            user: req.user.id,
            title: selectedAddress.title,
            detail: selectedAddress.detail,
            city: selectedAddress.city,
        })
        order.orderAddress = address._id;
    }



    const bankCard = await BankCard.findOne({ user: req.user.id, number: selectedCard.cardNumber.value })

    if (!bankCard) {

        const cardNumber = selectedCard.cardNumber.value.replace(/\s/g, '');

        const cardType = cardNumber.at(0) === "4" && "Visa" || cardNumber.at(0) === "5" && "MasterCard" || cardNumber.at(0) === "3" && "American Express" || "1.";

        const newBankCard = await BankCard.create({
            user: req.user.id,
            number: cardNumber,
            name: cardType + "Kartım",
            expiredMonth: selectedCard.cardExpiredMonth.value,
            expiredYear: selectedCard.cardExpiredYear.value,
            cvv: selectedCard.cardCvv.value
        })
        order.orderPayment = newBankCard._id;

    }
    else {

        order.orderPayment = bankCard._id;
    }

    await order.save()


    await Order.create({
        user: req.user.id,
        complete: false,
        transaction_id: uuidv4()
    })

    return res.status(200).json({
        success: true,
        message: "Order completed"
    })


})

const getAllMyOrders = asyncErrorWrapper(async (req, res, next) => {

    const orders = await Order.find({ user: req.user.id, complete: true }).select("dateOrdered user transaction_id ").sort({ dateOrdered: -1 })

    const orderContent = []

    await Promise.all(orders.map(async (order) => {
        const orderItems = await OrderItem.find({ order: order._id, orderStatus: true }).select("-order -orderStatus")
            .populate({
                path: "product",
                select: "name price images seller banner",
                populate: {
                    path: "banner",
                }
            }).sort({ date_added: -1 })

        const totalPrice = orderItems.reduce((acc, item) => {

            return acc + item.product.price * item.quantity
        }, 0)

        orderContent.push({
            order,
            orderItems,
            totalPrice
        })


    }))


    orderContent.sort((a, b) => {
        return new Date(b.order.dateOrdered) - new Date(a.order.dateOrdered)
    })


    return res.status(200).json({
        success: true,
        orderContent
    })

})

const getOrderDetails = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const order = await Order.findById(id).select("dateOrdered  transaction_id orderAddress  orderPayment").populate({
        path: "orderAddress",
        select: "name surname phone address city district neighborhood detail"
    }).populate({
        path: "orderPayment",
        select: "number"
    })
    const orderItems = await OrderItem.find({ order: order._id, orderStatus: true }).select("quantity product selectedSize ")
        .populate({
            path: "product",
            select: "name price images seller banner",
            populate: {
                path: "banner",
            }
        })

    const totalPrice = orderItems.reduce((acc, item) => {

        return acc + item.product.price * item.quantity

    }, 0)

    const productGroupSeller = orderItems.reduce((acc, item) => {
        const seller = item.product.seller

        if (!acc[seller]) {
            acc[seller] = {
                banner: item.product.banner,
                seller: item.product.seller,
                products: []
            }
        }
        acc[seller].products.push(item)
        return acc
    }, {})


    return res.status(200).json({
        success: true,
        order,
        totalPrice,
        orderItems: productGroupSeller,
        totalItemCount: orderItems.length
    })

})

const getAllEvaluatableItems = asyncErrorWrapper(async (req, res, next) => {

    const items = await Evaluation.find({ user: req.user.id, appravolStatus: false }).populate({
        path: "product",
        select: "name  banner images price averageRating",
        populate: {
            path: "banner",
            select: "deliveryTime name"
        }
    }).
        populate({
            path: "orderItem",
            select: "date_added",
        }).sort({ date_added: -1 })


    return res.status(200).json({
        success: true,
        len: items.length,
        items
    })

})

const getAllApprovedEvaluatableItems = asyncErrorWrapper(async (req, res, next) => {

    const approvedItems = await Evaluation.find({
        user: req.user.id,
        appravolStatus: true,
        comment: { $ne: null }
    }).populate({

        path: "product",
        select: "name  banner images price ",
        populate: {
            path: "banner",
            select: "name"
        }
    }).populate({
        path: "comment",
        select: "content rating nameVisible",
    })

    return res.status(200).json({
        success: true,
        approvedItems
    })

})


module.exports = {
    completeOrder,
    getAllMyOrders,
    getOrderDetails,
    getAllEvaluatableItems,
    getAllApprovedEvaluatableItems
}
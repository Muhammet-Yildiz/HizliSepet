
const asyncErrorWrapper = require("express-async-handler");
const Comment = require("../Models/comment");
const Product = require("../Models/product");
const Evaluation = require("../Models/evaluation");


const addComment = asyncErrorWrapper(async (req, res, next) => {

    const { content, rating, nameVisible, orderItemId, productId } = req.body;

    const newComment = await Comment.create({
        orderItem: orderItemId,
        user: req.user.id,
        content,
        rating,
        nameVisible
    })
    const product = await Product.findById(productId).populate("comments", "rating")

    product.comments.push(newComment)

    product.averageRating = (product.comments.reduce((acc, item) => item.rating + acc, 0)) / product.comments.length

    await product.save()

    const evaluationItem = await Evaluation.findOne({ user: req.user.id, product: productId })

    evaluationItem.appravolStatus = true
    evaluationItem.comment = newComment;

    await evaluationItem.save()

    return res.status(200).json({
        success: true,
        comment: newComment
    })

})

const deleteComment = asyncErrorWrapper(async (req, res, next) => {

    const { commentId, productId } = req.body;

    const product = await Product.findById(productId).populate("comments", "rating")

    const index = product.comments.findIndex(item => item._id.toString() === commentId)

    if (product.comments.length === 1) {
        product.averageRating = 0
    }
    else {
        product.averageRating = (product.comments.reduce((acc, item) => item.rating + acc, 0) - product.comments[index].rating) / (product.comments.length - 1)
    }

    product.comments.splice(index, 1)

    await product.save()

    const evaluationItem = await Evaluation.findOne({ user: req.user.id, product: productId })
    evaluationItem.appravolStatus = false
    evaluationItem.comment = null;;
    await evaluationItem.save()

    await Comment.findByIdAndDelete(commentId)

    return res.status(200).json({
        success: true,
        message: "Comment deleted"
    })

})



const editComment = asyncErrorWrapper(async (req, res, next) => {

    const { content, rating, nameVisible, orderItemId, productId } = req.body;

    const comment = await Comment.findOne({
        orderItem: orderItemId,
        user: req.user.id,
    })

    comment.content = content

    comment.rating = rating

    comment.nameVisible = nameVisible

    await comment.save()

    const product = await Product.findById(productId).populate("comments", "rating")

    product.averageRating = (product.comments.reduce((acc, item) => item.rating + acc, 0)) / product.comments.length

    await product.save()

    return res.status(200).json({
        success: true,
        comment: comment
    })

})

const getAllComments = asyncErrorWrapper(async (req, res, next) => {

    const comments = await Comment.find({ product: req.params.id })

    return res.status(200).json({
        success: true,
        comments
    })

})


module.exports = {
    getAllComments,
    addComment,
    editComment,
    deleteComment,
}
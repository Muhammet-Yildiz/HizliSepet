const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    code: {
        type: String,
        required: [true, "Please provide a code "],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a name "],
        trim: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    sizes: [],
    about: [],
    properties: {},
    images: [{
        type: String,
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    },

    seller: {
        type: 'String',
        required: [true, "Please provide a seller "],
    },
    banner: {
        type: mongoose.Schema.ObjectId,
        ref: "Banner",
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    subCategory: {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})


module.exports = mongoose.model("Product", productSchema)
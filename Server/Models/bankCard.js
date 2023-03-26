const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bankCardSchema = new Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Order must belong to a user"]
    },
    number: {
        type: String,
        required: [true, "Please provide a number"],
        unique: true,
        trim: true,
        maxLength: [16, "Please maximum 16 characters"],
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
    },
    cvv: {
        type: String,
        required: [true, "Please provide a cvv"],
        trim: true,
        maxLength: [3, "Please maximum 3 characters"],
    },
    expiredMonth: {
        type: String,
        required: [true, "Please provide a expiredMonth"],
        trim: true,
        maxLength: [2, "Please maximum 2 characters"],
    },
    expiredYear: {
        type: String,
        required: [true, "Please provide a expiredYear"],
        maxLength: [4, "Please maximum 2 characters"],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})


module.exports = mongoose.model("BankCard", bankCardSchema)
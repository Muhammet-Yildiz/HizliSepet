const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const addressSchema = new Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Order must belong to a user"]
    },
    title: {
        type: String,
        required: [true, "Please provide a title"],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Please provide a user name"],
    },
    surname: {
        type: String,
        required: [true, "Please provide a user surname"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone"],
    },
    city: {
        type: String,
        required: [true, "Please provide a city"],
    },
    district: {
        type: String,
        required: [true, "Please provide a district"],
    },
    neighborhood: {
        type: String,
        required: [true, "Please provide a neighborhood"],
    },
    detail: {
        type: String,
        required: [true, "Please provide a explanation"],
    },
    timestamp : {
        type : Date,
        default : Date.now
    }

})


module.exports = mongoose.model("Address", addressSchema)
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const bannerSchema = new Schema({

    name : {
        type : String,
        required : [true, "Please provide a name "],
        trim : true,
        unique : true
    },
    image : {
        type : String,
    },
    shippingTime : {
        type : Number,
        default : 0
    },
    deliveryTime : {
        type : Number,
        default : 0
    }
})


module.exports = mongoose.model("Banner", bannerSchema)
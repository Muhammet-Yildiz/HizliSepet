const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    product : {
        type : mongoose.Schema.ObjectId ,
        ref : "Product",
        required : [true, "Order must belong to a product"]
    },
    order : {
        type : mongoose.Schema.ObjectId ,
        ref : "Order",
        required : [true, "Order must belong to an order"]
    },
    quantity : {
        type : Number,
        default : 0
    },
    selectedSize : {
        type : String,
    },
    date_added : {
        type : Date,
        default : Date.now
    },
    orderStatus : {
        type : Boolean,
        default : false
    },
  
})


module.exports = mongoose.model("OrderItem", orderItemSchema)
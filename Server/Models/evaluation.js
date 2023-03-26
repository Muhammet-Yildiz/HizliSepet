const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
    user : {
        type : mongoose.Schema.ObjectId ,
        ref : "User",
    },
    orderItem : {
        type : mongoose.Schema.ObjectId ,
        ref : "OrderItem",
        required : [true, "OrderItem must belong to an order"]
    },
    product : {
        type : mongoose.Schema.ObjectId ,
        ref : "Product",
        required : [true, "Product must belong to an order"]
    },
    comment : {
        type : mongoose.Schema.ObjectId ,
        ref : "Comment",
    },
    appravolStatus  : {
        type : Boolean,
        default : false
    }
   
})


module.exports = mongoose.model("Evaluation", evaluationSchema)
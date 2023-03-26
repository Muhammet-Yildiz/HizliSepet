const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    user : {
        type : mongoose.Schema.ObjectId ,
        ref : "User",
    },
    orderItem : {
        type : mongoose.Schema.ObjectId ,
        ref : "OrderItem",
    },
    content : {
        type : String,
        required : [true, "Please provide a content "],
        trim : true,
    },
    nameVisible : {
        type : Boolean,
        default : false
    },
    rating : {
        type : Number,
        default : 0
    },
    image : {
        type : String,
    },
    created_at : {
        type : Date,
        default : Date.now
    },

})


module.exports = mongoose.model("Comment", commentSchema)
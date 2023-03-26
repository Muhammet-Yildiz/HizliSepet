const mongoose = require('mongoose');
const Orderitem = require('./orderitem');
const Evaluation = require('./evaluation');

const Schema = mongoose.Schema;

const orderSchema = new Schema({

    user : {
        type : mongoose.Schema.ObjectId ,
        ref : "User",
        required : [true, "Order must belong to a user"]
    },
    complete : {
        type : Boolean,
        default : false
    },
    transaction_id : {
        type : String,
        required : [true, "Please provide a transaction id"],
        unique : true ,
        trim : true ,
    },
    dateOrdered : {
        type : Date,
        default : Date.now
    },
    orderAddress : {
        type : mongoose.Schema.ObjectId,
        ref : "Address",
    },
    orderPayment : {
        type : mongoose.Schema.ObjectId,
        ref : "BankCard",
    },
}
)

orderSchema.post("save", async  function (next) {

    if(this.complete) {

        const orderItems = await Orderitem.find(({ order: this._id, orderStatus: true }))

        const filteredOrderItems = orderItems.filter((orderItem, index, self) =>
            index === self.findIndex((t) => (
                t.product._id.toString() === orderItem.product._id.toString()
            ))
        )
        
        filteredOrderItems.forEach(async (orderItem) =>{
           
                const evaluation = await Evaluation.findOne({
                    user  : this.user._id ,
                    product : orderItem.product._id
                })
             
                if(!evaluation) {
                    await Evaluation.create({
                        user : this.user._id ,
                        orderItem : orderItem._id,
                        product : orderItem.product._id,
                    })
                }
        })
    }
})


module.exports = mongoose.model("Order", orderSchema)
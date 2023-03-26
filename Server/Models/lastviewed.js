const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const lastViewedSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],

})


module.exports = mongoose.model("LastViewed", lastViewedSchema)
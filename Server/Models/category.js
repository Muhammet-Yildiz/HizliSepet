const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: [true, "Please provide a category name "],
        trim: true,
    },
    image: {
        type: String,
    },
    subCategories: [{
        type: Schema.Types.ObjectId,
        ref: "SubCategory"
    }]

})


module.exports = mongoose.model("Category", categorySchema)
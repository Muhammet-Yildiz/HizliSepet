const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const subCategorySchema = new Schema({
    name : {
        type : String,
        required : [true, "Please provide a subcategory name "],
    },
    image : {
        type : String,
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : "Category",
        required : true
    }
   
})


module.exports = mongoose.model("SubCategory", subCategorySchema)
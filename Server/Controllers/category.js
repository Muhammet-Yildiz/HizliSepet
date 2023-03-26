const CustomError = require("../Helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Category = require("../Models/category");
const Subcategory = require("../Models/subcategory");

const getAllCategories = asyncErrorWrapper(async (req, res, next) => {

    const categories = await Category.find().populate("subCategories");

    return res.status(200).json({
        success: true,
        categories
    });
});

const getAllSubCategories = asyncErrorWrapper(async (req, res, next) => {

    const subCategories = await Subcategory.find().populate("category");

    return res.status(200).json({
        success: true,
        subCategories
    });

});

const addSubCategory = asyncErrorWrapper(async (req, res, next) => {

    const {name } = req.body;

    const {categoryId} = req.params;

    const category = await Category.findById(categoryId);

    if(!category){
        return next(new CustomError("There is no such category with that id",400));
    }

    const subCategory = await Subcategory.create({
        name,
        image : req.savedImage,
        category : categoryId
    });


    category.subCategories.push(subCategory.id);

    await category.save();

    return res.status(200).json({
        success: true,
        subCategory
    });

});



const addCategory = asyncErrorWrapper(async (req, res, next) => {

    const {name} = req.body;

    const category = await Category.create({
        name,
        image : req.savedImage
    });

    return res.status(200).json({
        success: true,
        category
    });
});


module.exports = {
    addCategory,
    getAllCategories,
    getAllSubCategories,
    addSubCategory
}
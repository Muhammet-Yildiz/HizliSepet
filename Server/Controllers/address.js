const CustomError = require("../Helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const Address = require("../Models/address")

const getAllAddresses = asyncErrorWrapper(async (req, res, next) => {

    const addresses = await Address.find({ user: req.user.id });

    return res.status(200).json({
        success: true,
        addresses
    });

});



const addAddress = asyncErrorWrapper(async (req, res, next) => {

    const { address } = req.body;

    if (!address) {
        return next(new CustomError("Please provide an address", 400));
    }

    const newAddress = await Address.create({
        ...address,
        user: req.user.id
    });

    return res.status(200).json({
        success: true,
        newAddress
    });
});


const editAddress = asyncErrorWrapper(async (req, res, next) => {

    const { address, id } = req.body;

    if (!address) {
        return next(new CustomError("Please provide an address", 400));
    }

    const editedAddress = await Address.findByIdAndUpdate(id, {
        ...address,
        user: req.user.id
    });

    return res.status(200).json({
        success: true,
        editedAddress
    });
});


const deleteAddress = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        return next(new CustomError("Please provide an id", 400));
    }

    await Address.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: "address deleted",
    });
});

module.exports = {
    getAllAddresses,
    addAddress,
    editAddress,
    deleteAddress
}
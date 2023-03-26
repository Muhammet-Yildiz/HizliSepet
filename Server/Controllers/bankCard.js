const CustomError = require("../Helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const BankCard = require("../Models/bankCard")

const getAllBankCards = asyncErrorWrapper(async (req, res, next) => {
    
        const bankCards = await BankCard.find({user: req.user.id});
    
        return res.status(200).json({
            success: true,
            bankCards
        });
    }
);

const addBankCard = asyncErrorWrapper(async (req, res, next) => {

    const {number,cvv,expiredMonth ,expiredYear } = req.body;

    const  cardType =  number.at(0) === "4" && "Visa"  || number.at(0) === "5" && "MasterCard" || number.at(0) === "3" && "American Express" || "1.";

    if(!number) {
        return next(new CustomError("Please provide an number", 400));
    }

    const newBankCard = await BankCard.create({
        number ,
        cvv,
        expiredMonth ,
        expiredYear,
        name : cardType + '  Kartım',
        user: req.user.id
    });

    return res.status(200).json({
        success: true,
        newBankCard
    });

});


const editBankCard = asyncErrorWrapper(async (req, res, next) => {

    const { name  } = req.body;
    const {id} = req.params;

    const editedBankCard = await BankCard.findByIdAndUpdate(id, {
        name
    });

    return res.status(200).json({
        success: true,
        editedBankCard
    });

});


const deleteBankCard = asyncErrorWrapper(async (req, res, next) => {

    const { id } = req.params;

    const deletedBankCard = await BankCard.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        deletedBankCard
    });

});


module.exports = {
    getAllBankCards,
    editBankCard,
    deleteBankCard,
    addBankCard
}
const CustomError = require("../Helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const { comparePassword } = require('../Helpers/input/inputHelpers')
const User = require("../Models/user")

const changeEmail = asyncErrorWrapper(async (req, res, next) => {

    const { newEmail } = req.body;

    const isUser = await User.findOne({ email: newEmail })

    if (isUser) {
        return next(new CustomError("Bu email daha önce kullanılmış", 400))
    }
    const user = await User.findById(req.user.id)

    user.email = newEmail

    await user.save()

    return res.status(200).json({
        success: true,
        message: "Email başarıyla değiştirildi",
    })
})


const changePassword = asyncErrorWrapper(async (req, res, next) => {
    const { currentPass, newPass } = req.body;

    const user = await User.findById(req.user.id).select("+password")

    if (!comparePassword(currentPass.value, user.password)) {

        return next(new CustomError('Mevcut şifrenizi yanlış girdiniz.', 400))

    }

    user.password = newPass.value
    await user.save()

    return res.status(200).json({
        success: true,
        message: "Şifre başarıyla değiştirildi",
    })

})


module.exports = {
    changeEmail,
    changePassword
}
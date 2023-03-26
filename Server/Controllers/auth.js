const CustomError = require("../Helpers/error/CustomError")
const { sendJwtToClient } = require('../Helpers/authorization/tokenHelpers')
const { validateUserInput, comparePassword } = require('../Helpers/input/inputHelpers')
const asyncErrorWrapper = require("express-async-handler")
const User = require("../Models/user")

const register = asyncErrorWrapper(async (req, res, next) => {

    const { username, email, password, role } = req.body

    const isUser = await User.findOne({ email })

    if (isUser) {
        return next(new CustomError("Bu email  kullanılamaz. Lütfen başka bir email deneyiniz.", 400))
    }

    const newUser = await User.create({
        username,
        email,
        password,
        role
    })

    sendJwtToClient(newUser, res)

})


const login = asyncErrorWrapper(async (req, res, next) => {

    const { email, password } = req.body;

    if (!validateUserInput(email, password)) {

        return next(new CustomError("Please check your inputs ", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new CustomError('Invalid credentials ', 400));
    }

    if (!comparePassword(password, user.password)) {

        return next(new CustomError('Please check your credentails ', 400))

    }

    sendJwtToClient(user, res)

})

const getActiveUser = asyncErrorWrapper(async (req, res, next) => {

    const user = await User.findById(req.user.id)
        .select("email username ")
        .populate("likedProducts", "name price")

    return res.status(200).json({
        success: true,
        user
    })

})


const logout = asyncErrorWrapper(async (req, res, next) => {

    const { NODE_ENV } = process.env;

    return res.status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            secure: NODE_ENV === "development" ? false : true
        }).json({
            success: true,
            message: "Logout Successfull"
        })

})
module.exports = {
    register,
    login,
    getActiveUser,
    logout
}
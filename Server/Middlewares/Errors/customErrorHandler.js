const CustomError = require('../../Helpers/error/CustomError')

const customErrorHandler = (err, req, res, next) => {

    console.log("Custom Error Handler ", err.name)

    if (err.name === 'SyntaxError') {

        err = new CustomError('Unexpected Sytax ', 400)
    }
    if (err.name === 'ValidationError') {

        err = new CustomError(err.message, 400)

    }
    if (err.code === 11000) {

        err = new CustomError("Please enter different values for unique field", 400)
    }

    if (err.name === "CastError") {

        err = new CustomError("Please provide a valid id  ", 400)

    }

    console.log(err.name, err.message, err.status)

    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })

}


module.exports = {
    customErrorHandler
};
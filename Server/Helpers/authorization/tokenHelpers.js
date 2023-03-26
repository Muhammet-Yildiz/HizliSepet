const generateJwtFromUser = require('../../Models/user')

const sendJwtToClient = (user, res) => {

     const token = user.generateJwtFromUser();

     const { NODE_ENV } = process.env;

     return res
          .status(200)
          .cookie("access_token", token, {
               httpOnly: true,
               secure: NODE_ENV === "development" ? false : true
          })
          .json({
               success: true,
               access_token: token,
               data: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
               }
          })


}

const isTokenIncluded = (req) => {
     return (
          req.headers.authorization && req.headers.authorization.startsWith("Bearer")
     )
}


const getAccessTokenFromHeader = (req) => {

     const authorization = req.headers.authorization

     const access_token = authorization.substr(7).trim()

     return access_token
}


module.exports = { sendJwtToClient, isTokenIncluded, getAccessTokenFromHeader };  
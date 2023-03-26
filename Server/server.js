const express = require('express') 
const dotenv = require("dotenv")
const app = express() ; 

app.use(express.json())

const routers = require("./Routers/index")

const path =require('path')

const {customErrorHandler} = require("./Middlewares/Errors/customErrorHandler")


dotenv.config({
    path : './Config/env/config.env'
})


const connectDatabase = require("./Helpers/database/connectDatabase")

connectDatabase()


const PORT = process.env.PORT

// Routers Middleware 

app.use("/api" ,routers )


// Error Handler 

app.use(customErrorHandler)


// Static Files 
app.use(express.static(path.join(__dirname , "public") ))

app.listen(PORT, () => {

    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`)
})
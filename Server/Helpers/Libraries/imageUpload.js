
const multer = require('multer')
const path = require('path')
const CustomError = require('../error/CustomError')

const storage = multer.diskStorage({

    destination : function(req, file ,cb) {

        const rootDir = path.dirname(require.main.filename) ;

        cb(null , path.join(rootDir , "/public/uploads"))
    },
    filename : function(req,file,cb ) {

        const extensions = file.mimetype.split("/")[1]  ;

        req.savedImage = "image_" + Date.now() + "." + extensions

        cb(null ,req.savedImage)

    }

})

const fileFilter = (req,file ,cb ) => {

     allowedMimeTypes = ["image/jpg" ,"image/jpeg","image/png","image/gif"]

    if (! allowedMimeTypes.includes(file.mimetype)) {
      
        return cb(new CustomError("Please provide a valid image file",400),false);

    }

    return cb(null ,true  )

}

const imageUpload = multer({storage  ,fileFilter})

module.exports = imageUpload  ;
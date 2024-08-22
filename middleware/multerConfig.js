const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //check if the mimetype of file
        const allowedFileType = ['image/png','image/jpg','image/jpeg']
        if(!allowedFileType.includes(file.mimetype)){
            cb(new Error("This file type is not supported"))
            return
        }
      cb(null, './uploads') //cb(error,success)
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, Date.now() + "-"+file.originalname )
    }
  })
  
  module.exports = {
    multer,
    storage
  }
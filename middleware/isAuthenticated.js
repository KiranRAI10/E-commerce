const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const User = require("../model/userModel")

const isAuthenticated = async (req,res,next) =>{
    const token = req.headers.authorization
    if (!token){
        res.status(400).json({
            message : "Please login"
        })
    }
    //pathayo vane k garne tw
    //verify if that token is legit or not
    // jwt.verify(token,process.env.SECRET_KEY,(err,success) =>{
    //     if (err){
    //         res.status(400).json({
    //             message : "Invalid token" 
    //         })
    //     }else {
    //         res.status(200).json({
    //             message : "Valid token"
    //         })
    //     }
    // })

    //  Alternative
    try {
        const decoded = await promisify (jwt.verify)(token,process.env.SECRET_KEY)
        const doesUserExist = await User.findOne({_id: decoded.id})

        if (!doesUserExist){
            return res.status(400).json({
                message : "User does not exist with that id"
            })
        }
        req.user = doesUserExist

        next()
        
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
        
    }
    
    //check if decoded.id(userId) exists in the user table
    
}

module.exports = isAuthenticated
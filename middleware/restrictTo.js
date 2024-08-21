
const restrictTo = (...roles) =>{
    return (req,res,next) =>{
        const userRole = req.user.roles
        if(!roles.includes(userRole)){
            res.status(403).json({
                message : "You don't have permission to perform this action"
            })
        } else{
            next()
        }
    }

}

module.exports = restrictTo
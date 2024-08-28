const User = require("../../../model/userModel")
const bcrypt = require("bcryptjs")



//get profile API
exports.getMyProfile = async (req,res) => {
    const userId = req.user.id
    const myProfile = await User.findById(userId)

    res.status(200).json({
        message: "Profile fetched successfully",
        data: myProfile
    })
}


//update my profile API
exports.updateMyProfile = async (req,res) => {
    const { userName, userEmail, userPhoneNumber } = req.body
    const userId = req.user.id

    const updatedData = await User.findByIdAndUpdate(userId, { userName, userEmail, userPhoneNumber }, {
        runValidator: true,
        new: true
    })
    res.status(200).json({
        message: "Profile updated successfully",
        data: updatedData
    })
}



//delete my profile
exports.deleteMyProfile = async (req,res) => {
    const userId = req.user.id
    await User.findByIdAndDelete(userId)
    res.status(200).json({
        message: "User deleted successfully",
        data: null
    })

}

//update my password
exports.updateMyPassword = async (req,res) =>{
    const userId = req.user.id
    const {oldPassword, newPassword, confirmPassword} = req.body

    if(!oldPassword || !newPassword || !confirmPassword) {
       return res.status(400).json({
            message : "Please provide all the required details to change the password"
        })
    }
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message : "Password does not match with each other"
        })
    }
    //taking out the hash of the old password
    const userData = await User.findById(userId)
    const hashedOldPassword = userData.userPassword


    //check if oldPassword is correct or not
    const isOldPasswordCorrect = bcrypt.compareSync(oldPassword,hashedOldPassword)
    if(!isOldPasswordCorrect){
        return res.status(400).json({
            message : "Old Password does not match "
        })
    } 
    userData.userPassword = bcrypt.hashSync(newPassword,10)
    await userData.save()
    res.status(200).json({
        message : "Password changed successfully",

    })

}
const User = require("../../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const sendEmail = require("../../services/sendEmail")

//register user
exports.registerUser = async (req, res) => {
    const { email, password, phoneNumber, username } = req.body
    if (!email || !password || !phoneNumber || !username) {
        res.status(400).json({
            message: "Please provide all the necessary info"
        })
    }
    //check if email is unique or not
    const userFound = await User.find({ userEmail: email })

    if (userFound.length > 0) {
        return res.status(400).json({
            message: "Email already in use"
        })
    }


    //else
    await User.create({
        userName: username,
        userPhoneNumber: phoneNumber,
        userEmail: email,
        userPassword: bcrypt.hashSync(password, 10)

    })

    res.status(201).json({
        message: "User successfully registered"
    })
}

//login user
exports.loginUser =  async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({
            message: "Please provide email and password"
        })
    }

    //check if that email user exists or not
    const userFound = await User.find({ userEmail: email })
    if (userFound.length == 0) {
        return res.status(404).json({
            message: "User with that email is not registered"
        })

    }

    //password check
    const isMatched = bcrypt.compareSync(password, userFound[0].userPassword)
    if (isMatched) {
        //generate token
        const token = jwt.sign({id : userFound[0]._id},process.env.SECRET_KEY,{
            expiresIn : '30d'
        })







        res.status(200).json({
            message: "User logged in successfully",
            token
        })
    }
    else {
        res.status(404).json({
            message: "Invalid password"
        })
    }

}

// forgot password

exports.forgotPassword = async (req,res) =>{
    const {email}= req.body;
    if (!email){
        return res.status(400).json({
            message : "Please provide email"
        })
    }

    // check if email is registered or not
    const userExist = await User.find({userEmail : email})
    if(userExist.length ==0){
        return res.status(404).json({
            message : "Email is not registered"
        })
    }

    //send otp to that email
    const otp = Math.floor(1000+ Math.random() * 9000);
    userExist[0].otp = otp
    await userExist[0].save()

    await sendEmail({
        email : email,
        subject : "Your OTP is here do not share",
        message : `${otp}`
    })
    res.status(200).json({
        message : "Email sent successfully"
    })


}
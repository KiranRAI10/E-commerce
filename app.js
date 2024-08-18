const express = require("express")
const app = express()
const { connectDatabase } = require("./database/database")
const User = require("./model/userModel")
const jwt = require("jsonwebtoken")


const bcrypt = require("bcryptjs")

//Tell node to use Dotenv
require("dotenv").config()

//Database connection
connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//test api to check if server is live or not
app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am alive"
    })
})

//register user api
app.post("/register", async (req, res) => {
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
})

//login user api
app.post("/login", async (req, res) => {
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

})




const port = process.env.PORT
//listen server
app.listen(port, () => {
    console.log("Running on port " + port)
})
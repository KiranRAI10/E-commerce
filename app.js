const express = require("express")
const app = express()
const { connectDatabase } = require("./database/database")

const { registerUser, loginUser } = require("./controller/auth/authController")

//routes here
const authRoute = require("./routes/authRoute")




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

app.use("",authRoute)

const port = process.env.PORT
//listen server
app.listen(port, () => {
    console.log("Running on port " + port)
})
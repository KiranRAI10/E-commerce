const express = require("express")
const app = express()

//routes here
const authRoute = require("./routes/auth/authRoute")
const productRoute = require("./routes/admin/productRoute")
const adminUsersRoute = require("./routes/admin/adminUsersRoute")
const userReviewRoute = require("./routes/user/userReviewRoute")


//Tell node to use Dotenv
require("dotenv").config()

//Database connection
const { connectDatabase } = require("./database/database")
connectDatabase()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//telling nodejs to give access to uploads folder
app.use(express.static("uploads"))

//test api to check if server is live or not
app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am alive"
    })
})

app.use("/api",authRoute)
app.use("/api",productRoute)
app.use("/api",adminUsersRoute)
app.use("/api",userReviewRoute)

const port = process.env.PORT
//listen server
app.listen(port, () => {
    console.log("Running on port " + port)
})
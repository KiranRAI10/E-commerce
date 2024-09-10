const express = require("express")
const app = express()

//routes here
const authRoute = require("./routes/auth/authRoute")
const productRoute = require("./routes/admin/productRoute")
const adminUsersRoute = require("./routes/admin/adminUsersRoute")
const userReviewRoute = require("./routes/user/userReviewRoute")
const profileRoute = require("./routes/user/profileRoute")
const cartRoute = require("./routes/user/cartRoute")
const orderRoute = require("./routes/user/orderRoute")
const adminOrderRoute = require("./routes/admin/adminOrderRoute")
const paymentRoute = require("./routes/user/paymentRoute")



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

app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/admin",adminUsersRoute)
app.use("/api/admin",adminOrderRoute)
app.use("/api/reviews",userReviewRoute)
app.use("/api/profile",profileRoute)
app.use("/api/cart",cartRoute)
app.use("/api/order",orderRoute)
app.use("/api/payment",paymentRoute)

const port = process.env.PORT
//listen server
app.listen(port, () => {
    console.log("Running on port " + port)
})
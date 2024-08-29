const { addToCart, getMyCartItems } = require("../../controller/user/cart/cartController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")

const router = require("express").Router()

router.route("/:id")
.post(isAuthenticated,catchAsync(addToCart))

router.route("/")
.get(isAuthenticated,catchAsync(getMyCartItems))


module.exports = router
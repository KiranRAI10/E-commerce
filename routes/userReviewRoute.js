const router = require("express").Router()
const { getProductReview, createReview, deleteReview, addProductReview } = require("../controller/user/userController")
const isAuthenticated = require("../middleware/isAuthenticated")
const catchAsync = require("../services/catchAsync")

// router.route("/reviews")
router.route("/reviews/:id")
.post(isAuthenticated,catchAsync(addProductReview))
.get(getProductReview)
.delete(isAuthenticated,catchAsync(deleteReview))


module.exports = router
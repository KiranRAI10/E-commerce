const router = require("express").Router()
const { getMyReviews, createReview, deleteReview } = require("../../controller/user/review/reviewController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const catchAsync = require("../../services/catchAsync")


router.route("/reviews").get(isAuthenticated,catchAsync(getMyReviews))
router.route("/reviews/:id")
.post(isAuthenticated,catchAsync(createReview))
.delete(isAuthenticated,catchAsync(deleteReview))


module.exports = router


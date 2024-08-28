const router = require("express").Router()
const { getUsers, deleteUser } = require("../../controller/admin/user/userController")
const isAuthenticated = require("../../middleware/isAuthenticated")
const restrictTo = require("../../middleware/restrictTo")
const catchAsync = require("../../services/catchAsync")


router.route("/").get(isAuthenticated,restrictTo("admin"),catchAsync(getUsers))

router.route("/:id").delete(isAuthenticated,restrictTo("admin"),deleteUser)



module.exports = router


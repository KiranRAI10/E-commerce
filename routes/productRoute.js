const { createProduct, getProducts, getProduct } = require("../controller/admin/product/productController")
const isAuthenticated = require("../middleware/isAuthenticated")
const restrictTo = require("../middleware/restrictTo")

const router = require("express").Router()
const {multer,storage} =require("../middleware/multerConfig")
const upload = multer({storage : storage})

router.route("/products")
.post(isAuthenticated,restrictTo("admin"), upload.single('productImage'),createProduct)
.get(getProducts)

router.route("/products/:id").get(getProduct)

module.exports = router
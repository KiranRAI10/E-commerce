const Product = require("../../model/productModel")


exports.getProducts = async (req, res) => {

    // const products = await Product.find().populate({
    //     path : "reviews",
    //     populate : {
    //         path : "userId",
    //         select : "userName userEmail"
    //     }
    // })
    if (products.length == 0) {
        res.status(400).json({
            message: "No product found",
            products: []
        })
    } else {
        res.status(200).json({
            messsage: "Products fetched successfully",
            products
        })
    }
}

exports.getProduct = async (req, res) => {

    const { id } = req.params
    if (!id) {
        return res.status(400).json({
            message: "Please provide id of the product"
        })
    }
    const product = await Product.find({ _id: id })
    const productReviews = await Review.find({ productId: id }).populate("userId")
    if (product.length == 0) {
        res.status(400).json({
            message: "No product found with that id",
            data: {
                data: [],
                data2: []
            }
        })
    } else {
        res.status(200).json({
            message: "Product fetched successfully",
            data: {
                product,
                productReviews
            }
        })
    }
}
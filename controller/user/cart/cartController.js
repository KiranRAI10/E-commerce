const Product = require("../../../model/productModel")
const User = require("../../../model/userModel")

exports.addToCart = async (req,res) =>{
    const userId = req.user.id
    const productId = req.params.id
    if(!productId){
        return res.status(400).json({
            message : "Please provide product id"
        })
    }
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message : "Product with that id does not exists"
        })
    }
    const user = await User.findById(userId)
    user.cart.push(productId)
    await user.save()
    res.status(200).json({
        message : "Product added to cart"
    })
}

exports.getMyCartItems = async (req,res)=>{
    const userId = req.user.id
    const userData = await User.findById(userId).populate({
        path : "cart",
        select : "-productStatus -reviews"
    })
    
    res.status(200).json({
        message : "Cart data fetched successfully",
        data : userData.cart
    })

}

exports.deleteItemFromCart = async (req,res) =>{
    const productId = req.params.id
    const userId = req.user.id
    const product = await Product.findById(productId)
    if(!product) {
        return res.status(404).json({
            message : "No product with that product id"
        })
    }
    //get user cart
    const user = await User.findById(userId)
    user.cart = user.cart.filter((pId) =>pId != productId)
    await user.save()
    res.status(200).json({
        message : "Items removed from cart"
    })

}
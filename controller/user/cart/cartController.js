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
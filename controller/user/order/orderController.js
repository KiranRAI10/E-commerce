const Order = require("../../../model/orderSchema")

exports.createOrder = async (req,res) =>{
    const userId = req.user.id
    const {shippingAddress, item, totalAmount, paymentDetails} = req.body
    if(!shippingAddress || !item.length >0 || !totalAmount || !paymentDetails){
        return res.status(400).json({
            message : "Please provide all the details needed to order"
        })

    }
    await Order.create({
        user : userId,
        shippingAddress,
        totalAmount,
        item,
        paymentDetails
    })
    // console.log(user)
    res.status(200).json({
        message : "Order created successfully"
    })
}

exports.getMyOrders = async (req,res)=>{
    const userId = req.user.id
    
    const orders = await Order.find({user : userId}).populate({ 
        path : "item.product",
        model : "Product",
        select : "-productStockQty -createdAt -updatedAt -reviews -__v"
    })
    
    res.status(200).json({
        message : "Orders fetched successfully",
        orders
    })
}
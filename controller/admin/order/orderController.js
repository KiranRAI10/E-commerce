const Order = require("../../../model/orderSchema")


exports.getAllOrders = async (req,res)=>{
    const userId = req.user.id
    const orders = await Order.find().populate({
        path : "items.product",
        model : "Product"
    })
    if(orders.length ==0){
        return res.status(404).json({
            message : "No orders",
            data : []
        })
    }
    res.status(200).json({
        message : "Orders fetched successfully",
        data : orders
    })
}
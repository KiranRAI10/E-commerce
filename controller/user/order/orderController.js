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


exports.updateMyOrder = async (req,res) =>{
    const userId = req.user.id
    const {id} = req.params
    const {shippingAddress, item} = req.body
    if(!shippingAddress || !item.length == 0){
        return res.status(400).json({
            message : "Please provide shippingAddress and item"
        })
    }
    //get order of above id
    const existingOrder = await Order.findById(id)
    if(!existingOrder){
        return res.status(400).json({
            message : "No order with that id"
        })
    }
    //check if the trying to update user is true ordered user or not
    if(existingOrder.user == userId){
        return res.status(404).json({
            message : "You don't have the permission to update the order"
        })
    }

    if(existingOrder.orderStatus == "On the Way"){
        return res.status(400).json({
            message : "You cannot uppdate order when it is on the way"
        })
    }

    const updateOrder = await Order.findByIdAndUpdate(id,{shippingAddress, item})

    res.status(200).json({
        message : "Order updated successfully",
        data : updateOrder
    })

}

exports.deleteMyOrder = async (req,res) =>{
    const {id} = req.params
    const userId = req.user.id

    //check if order exists or not
    const order = await Order.findById(id)
    if(!order){
        return res.status(400).json({
            message : "No order with that id"
        })
    }

    if(order.user !== userId){
        return res.status(400).json({
            message : "You don't have permission to delete this order"
        })
    }
    await Order.findByIdAndDelete(id)
    res.status(200).json({
        message : "Order deleted successfully",
        data : null

    })
}

exports.cancelOrder = async(req,res) =>{
    const {id} = req.params
    const userId = req.user.id
    // const {status} = req.body


    //check id order exists or not
    const order = await Order.findById(id)
    if(!order){
        return res.status(400).json({
            message  : "No order with that id"
        })
    }
    if (order.user !== userId){
        return res.status(404).json({
            message : "You don't have the permission to delete this order"
        })
    }
    if(order.orderStatus !=="Pending"){
        return res.status(400).json({
            message : "You cannot cancel this order it is already underway"
        })
    }
    const updateOrder = await Order.findByIdAndUpdate(id,{
        orderStatus : "Cancelled"
    },{new : true})
    res.status(200).json({
        message : "Order cancelled successfully",
        data : updateOrder
    })

}


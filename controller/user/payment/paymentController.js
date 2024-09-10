const { default: axios } = require("axios") 

exports.initiateKhaltiPayment = async (req,res) =>{

    const {orderId, amount} = req.body
    if(!orderId || !amount){
        return res.status(400).json({
            message : "Order id and amount not available"

        })
        
    }
    const data ={
        return_url: "http://localhost:3000",
        purchase_order_id : orderId,
        amount : amount,
        website_url : "http://localhost:3000/",
        purchase_order_name : "orderName_" + orderId
    }
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data, {
        headers : {
             'Authorization' : 'key c5b0ba46e9f3495d95055ba2acbddbb8'
        }
    })
    console.log(response.data)
    res.redirect(response.data.payment_url)
}
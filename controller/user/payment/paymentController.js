

exports.initiateKhaltiPayment = async (req,res) =>{

    const {orderId, amount} = req.body
    if(!orderId || !amount){
        return res.status(400).json({
            message : "Order id and amount not available"

        })
        
    }
    const data ={
        return_url: "http://locahost:3000",
        purchase_order_id : orderId,
        amount : amount,
        website_url : "http://localhost:3000/"
    }
    axios.post("https://a.khalti.com/api/v2/epayment/initiate/",data, {
        headers : {
             
        }
    }

    )
}
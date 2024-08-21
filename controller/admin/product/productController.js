const Product = require("../../../model/productModel")



exports.createProduct = async (req,res) =>{
    const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body

    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
        return res.status(400).json({
            message : "Please provide all required info"
        })
    }

    //insert into product clooection/table
    await Product.create({
        productName ,
        productDescription,
        productPrice,
        productStockQty,
        productStatus
    })
    res.status(200).json({
        message : "Product created successfully"
    })
}
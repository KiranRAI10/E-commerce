const Product = require("../../../model/productModel")



exports.createProduct = async (req,res) =>{
  try {
    const file = (req.file)
    let filePath
    if(!file){
        filePath = ""

    } else {
        filePath = req.file.filename
    }

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
        productStatus,
        productImage : "http://localhost:3000/" + filePath
    })
    res.status(200).json({
        message : "Product created successfully"
    })
    
  } catch (err) {
    res.status(500).json({
        message : "Something went wrong"
    })
    
  }
}


exports.getProducts = async (req,res) =>{
    try {
        const products = await Product.find()
    if(products.length ==0){
        res.status(400).json({
            message : "No product found",
            products : []
        })
    } else {
        res.status(200).json({
            messsage : "Products fetched successfully",
            products
        })
    }
    } catch (err) {
        res.status(500).json({
            message : "Something went wrong in getProducts"
        })
        
    }
}

exports.getProduct = async (req,res) =>{
    try {
        const {id} = req.params
    if(!id ){
        return res.status(400).json({
            message : "Please provide id of the product"
        })
    }
    const product = await Product.find({_id : id})
    if (product.length == 0 ){
        res.status(400).json({
            message : "No product found with that id",
            product : []
        })
    } else {
        res.status(200).json({
            message : "Product fetched successfully",
            product 
        })
    }

    } catch (err) {
        res.status(500).json({
            message : "Something went wrong in getProduct"
        })
        
    }
}
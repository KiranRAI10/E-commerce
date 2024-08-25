const Product = require("../../../model/productModel")
const fs = require("fs")



exports.createProduct = async (req,res) =>{
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
        productImage : process.env.BACKEND_URL + filePath
    })
    res.status(200).json({
        message : "Product created successfully"
    })
    
}


exports.getProducts = async (req,res) =>{
   
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
}



exports.getProduct = async (req,res) =>{
   
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
}

exports.deleteProduct = async (req,res) =>{
    const {id} = req.params
    if (!id){
        return res.status(400).json({
            message : "Please provide id to delete product"
        })
    }

    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with that id"
        })
    }
    const oldProductImage = oldData.productImage
    const lengthToCut = process.env.BACKEND_URL.length
    const finalFilePath = oldProductImage.slice(lengthToCut)
   
    
        //remove file from uploads folder
        fs.unlink("./uploads/" + finalFilePath,(err)=>{
            if(err){
                console.log("Error deleting file", err)
            } else {
                console.log("File deleted successfully")
            }
        })


    await Product.findByIdAndDelete(id)
    res.status(200).json({
        message : "Product deleted successfully"
    })
}

exports.updateProduct = async (req,res) =>{
    const {id} = req.params
    const {productName,productDescription,productPrice,productStatus,productStockQty} = req.body

    if(!productName || !productDescription || !productPrice || !productStatus || !productStockQty){
        return res.status(400).json({
            message : "Please provide all required info"
        })
    }
    const oldData = await Product.findById(id)
    if(!oldData){
        return res.status(404).json({
            message : "No data found with taht id"
        })
    }
    const oldProductImage = oldData.productImage
    const lengthToCut = process.env.BACKEND_URL.length
    const finalFilePath = oldProductImage.slice(lengthToCut)

    if(req.file && req.file.filename){
        //remove file from uploads folder
        fs.unlink("./uploads/" + finalFilePath,(err)=>{
            if(err){
                console.log("Error deleting file", err)
            } else {
                console.log("File deleted successfully")
            }
        })

    }
   const datas = await Product.findByIdAndUpdate(id,{
        productName ,
        productDescription,
        productPrice,
        productStockQty,
        productStatus,
        productImage : req.file && req.file.filename ? process.env.BACKEND_URL + req.file.filename : oldProductImage

    },{
        new : true
    })
    res.status(200).json({
        message : "Product updated successfully",
        datas
        
    })

}

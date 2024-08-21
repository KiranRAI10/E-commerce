const mongoose = require("mongoose")
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName : {
        type : String,
        required : [true,"Product name must not be empty"]

    },
    productDescription: {
        type : String,
        required : [true, "Product Description must be provided"]
        
    },
    productStockQty: {
        type : Number,
        required : [true,'Product quantity must be provided']
    },
    productPrice : {
        type : Number,
        required : [true,"Product price must be provided"]
    },
    productStatus : {
        type : String,
        enum : ["available","unavailable"]

    }
    


},{
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)
module.exports = Product
const mongoose = require("mongoose")
const { newreviewSchema } = require("./nextReviewModel")
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

    },
    productImage : {
        type : String
    },
    reviews : [newreviewSchema]
    


},{
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)
module.exports = Product
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : [true,"A review must belong to a user"]
    },
    // productId : {
    //     type : Schema.Types.ObjectId,
    //     ref : "Product",
    //     required : [true, "A review must be done of a product"]
    // },
    rating : {
        type : Number,
        default : 3
    },
    message : {
        type : String,
        required : true
    }
}, {
    timestamps : true
})

const NextWayReview = mongoose.model("NextWayReview",reviewSchema)
module.exports = {
    NextWayReview,
    reviewSchema
}
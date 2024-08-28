const Product = require("../../../model/productModel")
const Review = require("../../../model/reviewModel")


exports.createReview = async (req,res) =>{
    const userId = req.user.id
    const {rating, message} = req.body
    const productId =req.params.id

    if(!rating || !message || !productId){
        return res.status(400).json({
            message : "Please provide all details"
        })
    }
    //check if that product exists or not
    const productExist = await Product.findById(productId)
    if(!productExist){
        return res.status(404).json({
            message : "Product with that product id does not exist"
        })
    }

    //insert them into Review
    await Review.create({
        userId,
        productId,
        rating,
        message
    })

    res.status(200).json({
        message : "Review added successfully"
    })

}

exports.getMyReviews = async (req,res) =>{
    const userId = req.user.id
    const reviews = await Review.find(userId)
    if(reviews.length ==0){
        res.status(404).json({
            message : "You haven't given review to any product",
            reviews : []
        })
    } else {
        res.status(200).json({
            message : "User reviews fetched successfully",
            reviews
        })
    }

}

exports.deleteReview = async(req,res) =>{
    const reviewId = req.params.id
    //check if that user created this review
    const userId = req.user.id
    if(!reviewId){
        res.status(400).json({
            message : "Please provide review id"

        })
    }
    const review = Review.findById(reviewId)
    const ownerOfReview = review.userId
    if(ownerOfReview !== userId){
        return res.status(400).json({
            message : "You are not authorized to delete the review"
        })
    }
    
    await Review.findByIdAndDelete(reviewId)
    res.status(200).json({
        message : "Review deleted successfully"
    })
}

// exports.addProductReview = async (req,res) =>{
//     const productId = req.params.id
//     const {rating, message} = req.body
//     const userId = req.user.id
//     const review = {
//         userId,
//         rating,
//         message,
//     }
//     const product = await Product.findById(productId)
//     product.reviews.push(review)
//     await product.save()
//     res.status(200).json({
//         message : "Review done "
//     })
// }
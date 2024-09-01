const mongoose = require("mongoose")


const Schema = mongoose.Schema

const orderSchema = new Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    item: [{
        quantity: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Delivered', 'Cancelled', 'On the Way', 'Preparing'],
        default: 'Pending'
    },
    paymentDetails: {
        method: { type: String, enum: ['Cash on delivery', 'Khalti'] },
        status: { type: String, enum: ['Paid', 'Unpaid', 'Pending'], default: 'Pending' }
    }
}, {
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order
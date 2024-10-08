const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
    agentemail: {
        type: String,
        required: true,
        ref: "Agents"
    },
    customeremail: {
        type: String,
        required: true,
        ref: "Agents"
    },
    productdetails: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    saledate: {
        type: Date,
        default: Date.now
    }
});

salesSchema.index({ agentemail: 1, customeremail: 1, "productdetails.productId": 1 }, { unique: true });

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;

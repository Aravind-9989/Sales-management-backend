const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        unique: true
    },
    productPrice: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    productDescription: {
        type: String,
        required: [true, 'Product description is required'],
    }
});

module.exports = mongoose.model('Product', productSchema);

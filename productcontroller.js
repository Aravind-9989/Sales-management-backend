const mongoose = require('mongoose');
const express = require('express');
const Product = require('./productschema'); 

const productController = async (req, res) => {
    try {
        const { productName, productPrice ,productDescription } = req.body;

        if (!productName || !productPrice || !productDescription) {
            return res.status(400).json({ message: 'Fields productName, productPrice, and productDescription are required.' });
        }

        const existingProduct = await Product.findOne({ productName });
        if (existingProduct) {
            return res.status(400).json({ message: 'Product with this name already exists.' });
        }

        const newProduct = new Product({
            productName,
            productPrice,
            productDescription
        });

        await newProduct.save();

        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
};

module.exports = productController;

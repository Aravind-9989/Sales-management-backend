const mongoose = require('mongoose');
const express = require('express');
const Agent=require("./schema")

const Agentcontroller = async (req, res) => {
    try {
        const { name, email, phone, companyid } = req.body;

        if (!name || !email || !phone || !companyid) {
            return res.status(400).json({ message: 'All fields (name, email, phone, companyId) are required.' });
        }

        const existingAgent = await Agent.findOne({ email });
        if (existingAgent) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newAgent = new Agent({
            name,
            email,
            phone,
            companyid
        });

        await newAgent.save();

        res.status(201).json({ message: 'Agent created successfully', agent: newAgent });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create agent', error: error.message });
    }
};

module.exports = Agentcontroller;

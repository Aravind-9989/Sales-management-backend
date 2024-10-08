const express = require("express")
const route = express.Router()
const Agentcontroller = require("./agentcontroller");
const collectioncontroller = require("./collectioncontroller");
const productController = require("./productcontroller");
const salescollections = require("./salecontroller");
const Summary = require("./summary");

route.get("/hi", (req, res)=>{
    return res.send("hello my server")
})

route.post('/agents',Agentcontroller)
route.post('/product',productController)
route.post('/collections',collectioncontroller)
route.post("/salescollect",salescollections)
route.get("/saleSummary/:agent_email",Summary)

module.exports= route


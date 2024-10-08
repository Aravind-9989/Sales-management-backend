const express = require("express");
const mongoose = require("mongoose");
const Agentcontroller = require("./agentcontroller");
const productController = require("./productcontroller");
const collectioncontroller = require("./collectioncontroller");
const salescollections = require("./salecontroller");
const Summary = require("./summary");
const route = require("./routes");



const app = express();
const port = 3000; 

app.get("/", (req, res)=>{
    return res.send("hello im server")
})

app.use(express.json());
app.use("/api",route)



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

const uri = "mongodb+srv://shetty2160:2Xk6oeubF9d6FkPh@cluster0.aqbcn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



mongoose.connect(uri,{dbName:"salesDB"})
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });

app.listen(port, () => {
    console.log(`Server is running successfully on port ${port}`);
});

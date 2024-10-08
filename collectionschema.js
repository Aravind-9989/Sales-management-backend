const mongoose = require("mongoose");

const collectionschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  agentEmail: {
    type:String,
    ref: "Agents",
    required:true
  },
  productsSold:[{
    productId:{ 
 type:mongoose.Schema.Types.ObjectId,
    ref:"Product"
    },
    date:{
      type:Date,
      default:Date.now()
    }
  },
 

]
});
module.exports = mongoose.model("Collections", collectionschema);

const Agents = require("./schema"); 
const Collectionscheme = require("./collectionschema");

const collectioncontrollers = async (req, res) => {
  try {
    const  { name, email, phonenumber, age, city, state, country, pincode, agentEmail, productsSold } = req.body;
    console.log(req.body)
    const agent = await Agents.findOne({ email: agentEmail });
console.log(agent)
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const lead = new Collectionscheme({ name, email, phonenumber, age, city, state, country, pincode, agentEmail: agentEmail, productsSold });
    await lead.save();

    const savedLead = await Collectionscheme.findById(lead.id).select("-__v");
    res.status(201).json(savedLead);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

module.exports = collectioncontrollers;

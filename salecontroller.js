const Agents = require("./schema");
const Leads = require("./collectionschema");
const Sales = require("./saleschema");

const SalesData = async (req, res) => {
    try {
        const { agentemail, customeremail, productdetails } = req.body;

        console.log(agentemail, customeremail, productdetails);

        if (!agentemail || !customeremail || !productdetails || productdetails.length === 0) {
            return res.status(400).json({ message: "Please provide agentemail, customeremail, and productdetails" });
        }

        const agent = await Agents.findOne({ email: agentemail });
        if (!agent) {
            return res.status(404).json({ message: "Agent not found" });
        }

        const lead = await Leads.findOne({ email: customeremail });
        if (!lead) {
            return res.status(404).json({ message: "Customer lead not found" });
        }

        const existingSale = await Sales.findOne({ 
            agentemail: agentemail, 
            customeremail: customeremail,
            "productdetails.productId": { $in: productdetails.map(item => item.productId) }
        });

        if (existingSale) {
            return res.status(409).json({ message: "A sale for this lead by the agent already exists for the given products" });
        }

        const newSale = new Sales({
            agentemail,
            customeremail,
            productdetails
        });

        await newSale.save();

        res.status(201).json({ message: "Sale successfully created", sale: newSale });

    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = SalesData;

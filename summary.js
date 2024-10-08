
const Sales = require("./saleschema");
const Product = require("./productschema");

const Summary = async (req, res) => {
    console.log("Summary function called");

    try {
        const agentemail = req.params.agent_email; 
        console.log("Agent Email:", agentemail);

        if (!agentemail) {
            return res.status(400).json({ message: "Agent email is required" });
        }

        const sales = await Sales.find({ agentemail: agentemail }).populate({
            path: "productdetails.productId",
            model: "Product"
        });

        console.log("Fetched sales data with populated product details:", JSON.stringify(sales, null, 2));

        if (!sales || sales.length === 0) {
            return res.status(404).json({ message: "No sales found for this agent" });
        }

        let totalAmount = 0;

        sales.forEach(sale => {
            if (Array.isArray(sale.productdetails)) {
                sale.productdetails.forEach(productdetail => {
                    if (productdetail.productId && typeof productdetail.productId.productPrice === 'number') {
                        const productPrice = productdetail.productId.productPrice;
                    
                        const quantity = productdetail.quantity || 0;

                        console.log(`Calculating amount: Price = ${productPrice}, Quantity = ${quantity}`);

                        totalAmount += productPrice * quantity;
                    } else {
                        console.error('Product detail missing or price is not a number:', productdetail);
                    }
                });
            } else {
                console.error('Product details are not an array or are missing:', sale);
            }
        });

        console.log("Total Amount Calculated:", totalAmount);

        res.status(200).json({
            message: "Sales data fetched successfully",
            sales: sales,
            totalAmount: totalAmount
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = Summary;

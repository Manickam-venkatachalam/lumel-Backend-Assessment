const fs = require("fs");
const csvParser = require("csv-parser");
const Sales = require("../schema/salesSchema");
const path = require("path");

const csvFilePath = path.join(__dirname, "../data.csv");

class loadData {
    loadCSVtoMongoDB = async (req, res) => {
        let salesData = [];
        try {    
            fs.createReadStream(csvFilePath)
                .pipe(csvParser())
                .on("data", (row) => {
                    salesData.push({
                        OrderID: row["Order ID"],
                        ProductID: row["Product ID"],
                        CustomerID: row["Customer ID"],
                        ProductName: row["Product Name"],
                        Category: row["Category"],
                        Region: row["Region"],
                        DateOfSale: new Date(row["Date of Sale"]),
                        QuantitySold: parseInt(row["Quantity Sold"], 10),
                        UnitPrice: parseFloat(row["Unit Price"]),
                        Discount: parseFloat(row["Discount"]),
                        ShippingCost: parseFloat(row["Shipping Cost"]),
                        PaymentMethod: row["Payment Method"]
                    });
                })
                .on("end", async () => {
                    try {
                        if (salesData.length > 0) {
                            await Sales.insertMany(salesData);
                            console.log(`Inserted ${salesData.length} records successfully.`);
                        } else {
                            console.log("No data to insert.");
                            return res.status(404).send({
                                message: 'No Data to Insert'
                            });
                        }
                    } catch (error) {
                        console.error("Error inserting data:", error);
                        return res.status(500).send({
                            message: 'ERROR while loading data'
                        });
                    }
                })
                .on("error", (error) => {
                    console.error("Error reading CSV:", error);
                    res.status(500).send({
                        message: 'Error while reading CSV Data'
                    });
                });
                console.log('[INFO] Data has been loaded successfully');
                res.status(200).send({
                    message: 'SUCCESS'
                });
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            return res.status(500).send({
                message: 'ERROR while loading data'
            });
        }
    }
}


module.exports = new loadData();
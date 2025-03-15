const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
    OrderID: {
        type: String
    },
    ProductID: {
        type: String
    },
    CustomerID: {
        type: String
    },
    ProductName: {
        type: String
    },
    Category: {
        type: String
    },
    Region: {
        type: String
    },
    DateOfSale: {
        type: Date
    },
    QuantitySold: {
        type: Number
    },
    UnitPrice: {
        type: Number
    },
    Discount: {
        type: Number
    },
    ShippingCost: {
        type: Number
    },
    PaymentMethod: {
        type: String
    },
    TotalRevenue: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Fix: Export the model directly, not an instance of the model
const Sales = mongoose.model("salesData", salesSchema);
module.exports = Sales;
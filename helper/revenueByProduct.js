const Sales = require('../schema/salesSchema');

class reverueByProduct {
    async reverueByProduct(startDate, endDate) {
        try {
            const result = await Sales.aggregate([
                {
                    $match: {
                        DateOfSale: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            productID: "$ProductID",
                            productName: "$ProductName"
                        },
                        totalRevenue: {
                            $sum: {
                                $multiply: [
                                    "$UnitPrice",
                                    "$QuantitySold",
                                    { $subtract: [1, "$Discount"] }
                                ]
                            }
                        },
                        totalQuantity: { $sum: "$QuantitySold" },
                        totalOrders: { $sum: 1 },
                        avgUnitPrice: { $avg: "$UnitPrice" },
                        avgDiscount: { $avg: "$Discount" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        productID: "$_id.productID",
                        productName: "$_id.productName",
                        totalRevenue: 1,
                        totalQuantity: 1,
                        totalOrders: 1,
                        avgUnitPrice: 1,
                        avgDiscount: 1,
                        revenuePerUnit: { $divide: ["$totalRevenue", "$totalQuantity"] }
                    }
                },
                { $sort: { totalRevenue: -1 } }
            ]);

            return result;
        } catch (error) {
            console.error('Error calculating revenue by product:', error);
            throw error;
        }
    }
}

module.exports = new reverueByProduct();


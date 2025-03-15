const sales = require('../schema/salesSchema');

class reverueByCatagory {
    async getRevenueByCategory(startDate, endDate) {
        try {
            const result = await sales.aggregate([
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
                        _id: "$Category",
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
                        shippingCost: { $sum: "$ShippingCost" },
                        products: { $addToSet: "$ProductID" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: "$_id",
                        totalRevenue: { $add: ["$totalRevenue", "$shippingCost"] },
                        totalQuantity: 1,
                        totalOrders: 1,
                        uniqueProducts: { $size: "$products" },
                        averageOrderValue: { $divide: ["$totalRevenue", "$totalOrders"] }
                    }
                },
                { $sort: { totalRevenue: -1 } }
            ]);

            return result;
        } catch (error) {
            console.error('Error calculating revenue by category:', error);
            throw error;
        }
    }
}

module.exports = new reverueByCatagory();


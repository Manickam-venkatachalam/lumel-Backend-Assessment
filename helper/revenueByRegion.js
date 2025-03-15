const Sales = require('../schema/salesSchema');

class revenueByRegion {
    async getRevenueByRegion(startDate, endDate) {
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
                        _id: "$Region",
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
                        customers: { $addToSet: "$CustomerID" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        region: "$_id",
                        totalRevenue: { $add: ["$totalRevenue", "$shippingCost"] },
                        totalQuantity: 1,
                        totalOrders: 1,
                        uniqueCustomers: { $size: "$customers" },
                        averageOrderValue: { $divide: ["$totalRevenue", "$totalOrders"] }
                    }
                },
                { $sort: { totalRevenue: -1 } }
            ]);

            return result;
        } catch (error) {
            console.error('Error calculating revenue by region:', error);
            throw error;
        }
    }
}

module.exports = new revenueByRegion();
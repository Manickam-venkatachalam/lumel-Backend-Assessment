const sales = require('../schema/salesSchema');
class revenueHelper {
    async calculateTotalRevenue(startDate, endDate) {
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
                        _id: null,
                        productRevenue: {
                            $sum: {
                                $multiply: [
                                    "$UnitPrice",
                                    "$QuantitySold",
                                    { $subtract: [1, "$Discount"] }
                                ]
                            }
                        },
                        shippingRevenue: { $sum: "$ShippingCost" },
                        totalOrders: { $sum: 1 },
                        totalItems: { $sum: "$QuantitySold" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        totalRevenue: { $add: ["$productRevenue", "$shippingRevenue"] },
                        productRevenue: 1,
                        shippingRevenue: 1,
                        totalOrders: 1,
                        totalItems: 1,
                        averageOrderValue: {
                            $divide: [
                                { $add: ["$productRevenue", "$shippingRevenue"] },
                                "$totalOrders"
                            ]
                        }
                    }
                }
            ]);
            return result.length > 0 ? result[0] : {
                totalRevenue: 0,
                productRevenue: 0,
                shippingRevenue: 0,
                totalOrders: 0,
                totalItems: 0,
                averageOrderValue: 0
            };
        } catch (error) {
            console.error('Error calculating total revenue:', error);
            throw error;
        }
    }
}


module.exports = new revenueHelper();
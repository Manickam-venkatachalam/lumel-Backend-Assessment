const { calculateTotalRevenue } = require('../helper/totalRevenueHelper');
const { getRevenueByCategory } = require('../helper/revenueByCatagory');
const { reverueByProduct } = require('../helper/revenueByProduct');
const { getRevenueByRegion } = require('../helper/revenueByRegion');

class revenuController {
    totalRevenue = async (req, res) => {
        let revenueData = null;
        try {
            let { startDate, endDate } = req.query;
            if (!startDate || !endDate) {
                return res.status(400).send({
                    message: 'Both startDate and endDate are required'
                });
            }
            if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
                return res.status(400).send({
                    message: 'Invalid date format. Use YYYY-MM-DD format'
                });
            }
            revenueData = await calculateTotalRevenue(startDate, endDate);
            return res.status(200).send({
                message: 'SUCCESS',
                data: revenueData
            });
        } catch (error) {
            return res.status(500).send({
                message: 'INTERNAL SERVER ERROR'
            });
        }
    }

    revenueByCatagory = async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).send({
                    message: 'Both startDate and endDate are required'
                });
            }
            if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
                return res.status(400).send({
                    message: 'Invalid date format. Use YYYY-MM-DD format'
                });
            }

            let data = await getRevenueByCategory(startDate, endDate);
            return res.status(200).send({
                message: 'SUCCESS',
                data
            });
        } catch (error) {
            console.error('Error in getRevenueByProduct controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to calculate revenue by product',
                error: error.message
            });
        }
    }

    revenueByProducts = async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).send({
                    message: 'Both startDate and endDate are required'
                });
            }
            if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
                return res.status(400).send({
                    message: 'Invalid date format. Use YYYY-MM-DD format'
                });
            }

            let data = await reverueByProduct(startDate, endDate);
            return res.status(200).send({
                message: 'SUCCESS',
                data
            });
        } catch (error) {
            console.error('Error in getRevenueByProduct controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to calculate revenue by product',
                error: error.message
            });
        }
    }

    revenueByRegion = async (req, res) => {
        try {
            const { startDate, endDate } = req.query;

            if (!startDate || !endDate) {
                return res.status(400).send({
                    message: 'Both startDate and endDate are required'
                });
            }
            if (isNaN(new Date(startDate).getTime()) || isNaN(new Date(endDate).getTime())) {
                return res.status(400).send({
                    message: 'Invalid date format. Use YYYY-MM-DD format'
                });
            }

            let data = await getRevenueByRegion(startDate, endDate);
            return res.status(200).send({
                message: 'SUCCESS',
                data
            });
        } catch (error) {
            console.error('Error in getRevenueByProduct controller:', error);
            return res.status(500).json({
                success: false,
                message: 'Failed to calculate revenue by product',
                error: error.message
            });
        }
    }
}

module.exports = new revenuController();
const express = require('express');
const router = express.Router();
const revenueController = require('./src/revenuController');

router.get('/total', revenueController.totalRevenue);
router.get('/catagory', revenueController.revenueByCatagory);
router.get('/product', revenueController.revenueByProducts);
router.get('/region', revenueController.revenueByRegion);

module.exports = router;
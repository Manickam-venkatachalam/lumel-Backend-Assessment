// routes/revenueRoutes.js
const express = require('express');
const router = express.Router();
const dataLoader = require('./src/dataLoader');


router.post('/load', dataLoader.loadCSVtoMongoDB);


module.exports = router;
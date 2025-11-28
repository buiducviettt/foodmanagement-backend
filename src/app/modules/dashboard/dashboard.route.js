const express = require('express');
const router = express.Router();
const controller = require('./dashboard.controller');

router.get('/stats', controller.getDashboardStats);
router.get('/top-dishes', controller.getTopDishes);
router.get('/order-types', controller.getOrderTypes);
module.exports = router;

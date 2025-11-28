const express = require('express');
const router = express.Router();
const controller = require('./order.controller');
router.get('/', controller.getOrders);
router.post('/', controller.createOrderController);
module.exports = router;

const service = require('./order.service');
async function createOrderController(req, res) {
  try {
    const { cart, customer, type } = req.body;
    console.log('🧪 ORDER RECEIVE:', req.body);
    const order = await service.createOrder({ cart, customer, type });
    return res.json({ success: true, order });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}
// lấy danh sách order
async function getOrders(req, res) {
  try {
    const orders = await service.getOrders();
    return res.json(orders); // ⬅⬅⬅ TRẢ THẲNG ARRAY
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
}

module.exports = { createOrderController, getOrders };

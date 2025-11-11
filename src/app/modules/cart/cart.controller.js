const service = require('./cart.service');
async function getCart(req, res) {
  console.log('🧩 req.user:', req.user);
  const userId = req.user.sub;
  const cart = await service.getCart(userId);
  return res.json(cart);
}
// create cart
async function addToCart(req, res) {
  try {
    console.log('param của product', req.params.productId); // ✅ di chuyển ra ngoài
    const cart = await service.addToCart(
      req.user.sub,
      Number(req.params.productId),
    );
    res.json(cart);
  } catch (e) {
    console.error('❌ AddToCart error:', e);
    res.status(500).json({ message: e.message });
  }
}

async function removeFromCart(req, res) {
  try {
    const cart = await service.removeFromCart(
      req.user.sub,
      Number(req.params.productId),
    );
    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = { getCart, addToCart, removeFromCart };

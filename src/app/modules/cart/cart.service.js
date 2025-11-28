const prisma = require('../../../lib/prisma');

/**
 * 🟦 Tính total cart
 */
function calculateTotal(cart) {
  if (!cart || !cart.items) return 0;

  return cart.items.reduce((sum, item) => {
    const price = item.product?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);
}

/**
 * 🟦 GET CART
 */
async function getCart(userId) {
  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart) return { id: null, items: [], total: 0 };

  return {
    ...cart,
    total: calculateTotal(cart),
  };
}

/**
 * 🟦 ADD TO CART — CÓ CHECK STOCK + TRỪ STOCK
 */
async function addToCart(userId, productId) {
  // Lấy product để check stock
  const product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });

  if (!product) throw new Error('Sản phẩm không tồn tại');

  if (product.stock <= 0) {
    throw new Error('Hết hàng');
  }

  // Giảm stock
  await prisma.product.update({
    where: { id: Number(productId) },
    data: { stock: product.stock - 1 },
  });

  // Lấy cart
  let cart = await prisma.cart.findFirst({ where: { userId } });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  // Kiểm tra item
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: Number(productId) },
  });

  if (existingItem) {
    // Tăng số lượng
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });
  } else {
    // Tạo mới
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: Number(productId),
        quantity: 1,
      },
    });
  }

  // Return cart
  const updatedCart = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } },
  });

  return {
    ...updatedCart,
    total: calculateTotal(updatedCart),
  };
}

/**
 * 🟦 REMOVE — CÓ TRẢ STOCK
 */
async function removeFromCart(userId, productId) {
  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return { items: [], total: 0 };

  const item = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId: Number(productId) },
  });

  if (item) {
    // Trả stock
    await prisma.product.update({
      where: { id: Number(productId) },
      data: { stock: { increment: item.quantity } },
    });
  }

  // Xóa item
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId: Number(productId) },
  });

  // Lấy cart
  const updatedCart = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } },
  });

  return {
    ...updatedCart,
    total: calculateTotal(updatedCart),
  };
}

module.exports = { getCart, removeFromCart, addToCart };

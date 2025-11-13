const prisma = require('../../../lib/prisma');

async function getCart(userId) {
  return prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        // ✅ đổi từ cartItems → items
        include: {
          product: true,
        },
      },
    },
  });
}

async function addToCart(userId, productId) {
  let cart = await prisma.cart.findFirst({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  }

  return prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } }, // ✅ giữ nguyên
  });
}

async function removeFromCart(userId, productId) {
  const cart = await prisma.cart.findFirst({ where: { userId } });
  if (!cart) return null;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId: Number(productId) },
  });

  return prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true } } }, // ✅ giữ nguyên
  });
}

module.exports = { getCart, removeFromCart, addToCart };

const prisma = require('../../../lib/prisma');

async function createOrder({ cart, customer, type }) {
  try {
    let total = 0;

    // 🔥 Tạo order trong 1 transaction để tránh lỗi khi trừ stock
    const result = await prisma.$transaction(async (tx) => {
      // 1️⃣ Tạo Order trước
      const order = await tx.order.create({
        data: {
          customer,
          type,
          total: 0, // tạm thời, lát tính lại
        },
      });

      // 2️⃣ Duyệt từng item trong cart
      for (const item of cart) {
        const product = await tx.product.findUnique({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Sản phẩm ${item.productId} không tồn tại`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Không đủ stock cho sản phẩm ${product.title}`);
        }
        // Tính total
        total += product.price * item.quantity;

        // 3️⃣ Tạo order item
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
          },
        });

        // 4️⃣ Trừ stock
        await tx.product.update({
          where: { id: product.id },
          data: { stock: product.stock - item.quantity },
        });
      }

      // 5️⃣ Cập nhật total vào order
      const updatedOrder = await tx.order.update({
        where: { id: order.id },
        data: { total },
      });

      // 6️⃣ Lưu revenue
      await tx.revenue.create({
        data: {
          orderId: order.id,
          amount: total,
        },
      });

      return updatedOrder;
    });

    return result;
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    throw error;
  }
}
// get orders
async function getOrders() {
  try {
    const orders = await prisma.order.findMany();
    return orders;
  } catch (error) {
    console.error('Lỗi tạo đơn hàng:', error);
    throw error;
  }
}

module.exports = { createOrder, getOrders };

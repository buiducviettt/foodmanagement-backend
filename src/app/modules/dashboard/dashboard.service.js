const prisma = require('../../../lib/prisma');

// 1️⃣ Tổng quan dashboard
exports.getDashboardStats = async () => {
  const totalOrders = await prisma.order.count();

  const orders = await prisma.order.findMany();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dailyOrders = orders.filter(
    (order) => new Date(order.createdAt) >= today,
  );

  const dailyRevenue = dailyOrders.reduce((sum, order) => sum + order.total, 0);

  const uniqueCustomers = new Set(orders.map((o) => o.customer)).size;

  return {
    dailyRevenue,
    totalRevenue,
    totalOrders,
    uniqueCustomers,
  };
};

// 2️⃣ Món ăn bán chạy
exports.getTopDishes = async () => {
  const items = await prisma.orderItem.findMany({
    include: { product: true },
  });

  const map = {};

  items.forEach((item) => {
    if (!map[item.productId]) {
      map[item.productId] = {
        id: item.productId,
        name: item.product.title,
        image: item.product.image,
        count: 0,
      };
    }
    map[item.productId].count += item.quantity;
  });

  return Object.values(map)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5
};

// 3️⃣ Tính số lượng order theo từng loại
exports.getOrderTypes = async () => {
  const orders = await prisma.order.groupBy({
    by: ['type'],
    _count: { type: true },
  });

  const total = orders.reduce((sum, o) => sum + o._count.type, 0);

  return orders.map((o) => ({
    type: o.type,
    count: o._count.type,
    percentage: ((o._count.type / total) * 100).toFixed(1) + '%',
  }));
};

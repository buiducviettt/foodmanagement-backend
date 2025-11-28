const service = require('./dashboard.service');

exports.getDashboardStats = async (req, res) => {
  try {
    const data = await service.getDashboardStats();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load dashboard stats' });
  }
};

exports.getTopDishes = async (req, res) => {
  try {
    const data = await service.getTopDishes();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load top dishes' });
  }
};

exports.getOrderTypes = async (req, res) => {
  try {
    const data = await service.getOrderTypes();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load order types' });
  }
};

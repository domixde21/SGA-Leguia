import { getDashboardStats } from '../services/dashboard.service.js';

export const getStats = async (req, res) => {
  try {
    const stats = await getDashboardStats();

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
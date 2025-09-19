const express = require('express');
const Tracking = require('../model/Tracking');
const router = express.Router();

// 创建新的访问记录
router.post('/', async (req, res) => {
  try {
    const trackingData = {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      timestamp: new Date(),
      pageUrl: req.body.pageUrl || req.get('Referer'),
      referrer: req.body.referrer || req.get('Referer'),
      duration: req.body.duration || 0
    };

    const result = await new Tracking().create(trackingData);
    res.status(201).json({
      success: true,
      message: 'Tracking record created successfully',
      data: result
    });
  } catch (error) {
    console.error('Error creating tracking record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create tracking record',
      error: error.message
    });
  }
});

// 获取所有访问记录（支持分页和排序）
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || 'timestamp';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const result = await new Tracking().getAll(page, limit, sortBy, sortOrder);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting tracking records:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking records',
      error: error.message
    });
  }
});

// 根据ID获取访问记录
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const record = await new Tracking().getById(id);
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Tracking record not found'
      });
    }

    res.json({
      success: true,
      data: record
    });
  } catch (error) {
    console.error('Error getting tracking record by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking record',
      error: error.message
    });
  }
});

// 根据IP获取访问记录
router.get('/ip/:ip', async (req, res) => {
  try {
    const { ip } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await new Tracking().getByIp(ip, page, limit);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting tracking records by IP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking records by IP',
      error: error.message
    });
  }
});

// 根据时间范围获取访问记录
router.get('/date-range/:startDate/:endDate', async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await new Tracking().getByDateRange(startDate, endDate, page, limit);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error getting tracking records by date range:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking records by date range',
      error: error.message
    });
  }
});

// 获取访问统计信息
router.get('/stats/overview', async (req, res) => {
  try {
    const stats = await new Tracking().getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting tracking stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking statistics',
      error: error.message
    });
  }
});

// 更新访问记录的停留时间
router.patch('/:id/duration', async (req, res) => {
  try {
    const { id } = req.params;
    const { duration } = req.body;

    if (typeof duration !== 'number' || duration < 0) {
      return res.status(400).json({
        success: false,
        message: 'Duration must be a non-negative number'
      });
    }

    const result = await new Tracking().updateDuration(id, duration);
    
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: 'Tracking record not found or not updated'
      });
    }

    res.json({
      success: true,
      message: 'Duration updated successfully'
    });
  } catch (error) {
    console.error('Error updating tracking duration:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update duration',
      error: error.message
    });
  }
});

// 删除访问记录
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await new Tracking().delete(id);
    
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: 'Tracking record not found'
      });
    }

    res.json({
      success: true,
      message: 'Tracking record deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tracking record:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete tracking record',
      error: error.message
    });
  }
});

// 批量删除过期记录
router.delete('/cleanup/old', async (req, res) => {
  try {
    const daysOld = parseInt(req.query.daysOld) || 30;
    const result = await new Tracking().deleteOldRecords(daysOld);
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} old records`,
      data: result
    });
  } catch (error) {
    console.error('Error cleaning up old tracking records:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cleanup old records',
      error: error.message
    });
  }
});

// 实时访问记录（用于页面访问时自动记录）
router.post('/visit', async (req, res) => {
  try {
    const trackingData = {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      timestamp: new Date(),
      pageUrl: req.body.pageUrl || req.get('Referer'),
      referrer: req.body.referrer || req.get('Referer'),
      duration: 0 // 初始停留时间为0
    };

    const result = await new Tracking().create(trackingData);
    res.status(201).json({
      success: true,
      message: 'Visit recorded successfully',
      trackingId: result.id
    });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record visit',
      error: error.message
    });
  }
});

module.exports = router;

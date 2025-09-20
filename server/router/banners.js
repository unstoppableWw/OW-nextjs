const express = require('express');
const Banner = require('../model/Banner');

const router = express.Router();

// 获取所有banner
router.get('/', async (req, res) => {
  try {
    const category = req.query.category;
    let banners;
    
    if (category) {
      banners = await new Banner().getByCategory(category);
    } else {
      banners = await new Banner().getAll();
    }

    // 确保每个banner都有url字段
    const bannersWithUrl = banners.map(banner => ({
      ...banner,
      url: banner.url || `/banners/${encodeURIComponent(banner.fileName)}`
    }));

    res.json({ success: true, data: bannersWithUrl });
  } catch (error) {
    console.error('Failed to list banners:', error);
    res.status(500).json({ success: false, message: 'Failed to list banners' });
  }
});

// 根据ID获取单个banner
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await new Banner().getById(id);
    
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({ success: true, data: banner });
  } catch (error) {
    console.error('Failed to get banner:', error);
    res.status(500).json({ success: false, message: 'Failed to get banner' });
  }
});

// 创建新banner
router.post('/', async (req, res) => {
  try {
    const result = await new Banner().create(req.body);
    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: result
    });
  } catch (error) {
    console.error('Failed to create banner:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create banner',
      error: error.message
    });
  }
});

// 更新banner
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await new Banner().update(id, req.body);
    
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found or not updated'
      });
    }

    res.json({
      success: true,
      message: 'Banner updated successfully'
    });
  } catch (error) {
    console.error('Failed to update banner:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update banner',
      error: error.message
    });
  }
});

// 删除banner
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await new Banner().delete(id);
    
    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found'
      });
    }

    res.json({
      success: true,
      message: 'Banner deleted successfully'
    });
  } catch (error) {
    console.error('Failed to delete banner:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete banner',
      error: error.message
    });
  }
});

module.exports = router;
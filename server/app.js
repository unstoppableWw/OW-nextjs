const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB } = require('./lib/db');
const trackingRoutes = require('./router/tracking');
const bannerRoutes = require('./router/banners');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// 允许跨域（前端在 3000 端口，后端在 3001 端口时必需）
app.use(cors());

// 静态资源挂载：将 D:\img\banners 暴露为 /banners 供前端直接访问
const BANNER_DIR = process.env.BANNER_DIR || 'D:\\img\\banners';
app.use('/banners', express.static(BANNER_DIR, { fallthrough: true, index: false }));

app.use('/api/tracking', trackingRoutes);
app.use('/api/banners', bannerRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;

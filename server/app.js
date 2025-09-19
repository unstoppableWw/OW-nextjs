const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./lib/db');
const trackingRoutes = require('./router/tracking');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// 允许跨域（前端在 3000 端口，后端在 3001 端口时必需）
app.use(cors());

app.use('/api/tracking', trackingRoutes);

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

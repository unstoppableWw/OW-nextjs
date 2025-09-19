const express = require('express');
require('dotenv').config();

const { connectDB } = require('./lib/db');
const trackingRoutes = require('./router/tracking');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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

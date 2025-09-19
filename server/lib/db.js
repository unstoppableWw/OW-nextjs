const { MongoClient } = require('mongodb');

let client;
let db;

async function connectDB() {
  if (!client) {
    try {
      const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
      client = new MongoClient(mongoUrl);
      await client.connect();
      db = client.db(process.env.DB_NAME || 'ow');
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
  return { client, db };
}

async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log('MongoDB connection closed');
  }
}

module.exports = { connectDB, getDB, closeDB };


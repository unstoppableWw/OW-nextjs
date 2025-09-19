const { getDB } = require('../lib/db');

class Tracking {
  constructor() {
    this.collectionName = 'tracking';
  }

  async getCollection() {
    const db = await getDB();
    return db.collection(this.collectionName);
  }

  // 创建新的访问记录
  async create(trackingData) {
    try {
      const collection = await this.getCollection();
      
      // 验证必需字段
      if (!trackingData.ip || !trackingData.userAgent || !trackingData.timestamp) {
        throw new Error('Missing required fields: ip, userAgent, timestamp');
      }

      // 确保timestamp是Date对象
      if (typeof trackingData.timestamp === 'string') {
        trackingData.timestamp = new Date(trackingData.timestamp);
      }

      const result = await collection.insertOne(trackingData);
      return { success: true, id: result.insertedId, data: trackingData };
    } catch (error) {
      console.error('Error creating tracking record:', error);
      throw error;
    }
  }

}

module.exports = Tracking;

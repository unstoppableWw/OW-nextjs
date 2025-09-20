const { getDB } = require('../lib/db');

class Banner {
  constructor() {
    this.collectionName = 'banners';
  }

  async getCollection() {
    const db = await getDB();
    return db.collection(this.collectionName);
  }

  // 创建新的banner记录
  async create(bannerData) {
    try {
      const collection = await this.getCollection();
      
      // 验证必需字段
      if (!bannerData.fileName) {
        throw new Error('Missing required field: fileName');
      }

      const data = {
        fileName: bannerData.fileName,
        url: bannerData.url || `/banners/${encodeURIComponent(bannerData.fileName)}`,
        title: bannerData.title || '',
        description: bannerData.description || '',
        category: bannerData.category || 'default',
        isActive: bannerData.isActive !== undefined ? bannerData.isActive : true,
        sortOrder: bannerData.sortOrder || 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(data);
      return { success: true, id: result.insertedId, data };
    } catch (error) {
      console.error('Error creating banner record:', error);
      throw error;
    }
  }

  // 获取所有banner记录
  async getAll() {
    try {
      const collection = await this.getCollection();
      const records = await collection.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 }).toArray();
      return records;
    } catch (error) {
      console.error('Error getting all banner records:', error);
      throw error;
    }
  }

  // 根据分类获取banner记录
  async getByCategory(category) {
    try {
      const collection = await this.getCollection();
      const records = await collection.find({ 
        category, 
        isActive: true 
      }).sort({ sortOrder: 1, createdAt: -1 }).toArray();
      return records;
    } catch (error) {
      console.error('Error getting banner records by category:', error);
      throw error;
    }
  }

  // 根据ID获取banner记录
  async getById(id) {
    try {
      const collection = await this.getCollection();
      const { ObjectId } = require('mongodb');
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.error('Error getting banner record by ID:', error);
      throw error;
    }
  }

  // 更新banner记录
  async update(id, updateData) {
    try {
      const collection = await this.getCollection();
      const { ObjectId } = require('mongodb');
      
      const data = {
        ...updateData,
        updatedAt: new Date()
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );

      return { success: result.modifiedCount > 0 };
    } catch (error) {
      console.error('Error updating banner record:', error);
      throw error;
    }
  }

  // 删除banner记录
  async delete(id) {
    try {
      const collection = await this.getCollection();
      const { ObjectId } = require('mongodb');
      
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return { success: result.deletedCount > 0 };
    } catch (error) {
      console.error('Error deleting banner record:', error);
      throw error;
    }
  }
}

module.exports = Banner;

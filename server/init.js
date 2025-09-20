// init_ow_database.js
// 运行命令: mongosh init_ow_database.js

// 连接到MongoDB（默认连接本地MongoDB）
const conn = new Mongo();
const db = conn.getDB("ow");

// 删除现有的banners集合（如果存在）
try {
  db.banners.drop();
  print("已删除现有的banners集合");
} catch (error) {
  print("banners集合不存在或删除失败:", error.message);
}

// 创建banners集合（表）
db.createCollection("banners", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["fileName", "createdAt"],
      properties: {
        fileName: {
          bsonType: "string",
          description: "图片文件名，必须为字符串且必填"
        },
        url: {
          bsonType: "string",
          description: "图片访问URL，必须为字符串且必填"
        },
        title: {
          bsonType: "string",
          description: "图片标题"
        },
        description: {
          bsonType: "string",
          description: "图片描述"
        },
        category: {
          bsonType: "string",
          description: "图片分类"
        },
        isActive: {
          bsonType: "bool",
          description: "是否启用，默认为true"
        },
        sortOrder: {
          bsonType: "int",
          minimum: 0,
          description: "排序顺序，数字越小越靠前"
        },
        createdAt: {
          bsonType: "date",
          description: "创建时间，必须为日期且必填"
        },
        updatedAt: {
          bsonType: "date",
          description: "更新时间"
        }
      }
    }
  }
});



// 插入一些banner示例数据
// 注意：使用相对路径，前端可以直接访问
db.banners.insertMany([
  {
    fileName: "banner1.png",
    url: "/banners/banner1.png",
    title: "首页轮播图1",
    description: "这是第一张轮播图",
    category: "homepage",
    isActive: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// 验证集合创建成功
print("数据库 'ow' 创建成功！");
print("集合 'banners' 创建成功！");
print("已插入 " + db.banners.countDocuments() + " 条banner示例数据");

// 显示集合结构

print("\nBanners集合结构:");
printjson(db.banners.find().sort({ sortOrder: 1 }));
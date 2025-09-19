// init_ow_database.js
// 运行命令: mongosh init_ow_database.js

// 连接到MongoDB（默认连接本地MongoDB）
const conn = new Mongo();
const db = conn.getDB("ow");

// 创建tracking集合（表）
db.createCollection("tracking", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["ip", "userAgent", "timestamp"],
      properties: {
        ip: {
          bsonType: "string",
          description: "用户IP地址，必须为字符串且必填"
        },
        userAgent: {
          bsonType: "string",
          description: "用户浏览器信息，必须为字符串且必填"
        },
        duration: {
          bsonType: "int",
          minimum: 0,
          description: "停留时间（秒），必须为非负整数"
        },
        timestamp: {
          bsonType: "date",
          description: "访问时间，必须为日期且必填"
        },
        pageUrl: {
          bsonType: "string",
          description: "访问页面URL"
        },
        referrer: {
          bsonType: "string",
          description: "来源页面"
        }
      }
    }
  }
});

// 创建索引以提高查询性能
db.tracking.createIndex({ "timestamp": -1 });
db.tracking.createIndex({ "ip": 1 });
db.tracking.createIndex({ "duration": -1 });

// 插入一些示例数据
db.tracking.insertMany([
  {
    ip: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    duration: 45,
    timestamp: new Date("2023-10-01T10:30:00Z"),
    pageUrl: "https://example.com/home",
    referrer: "https://google.com"
  },
  {
    ip: "172.16.0.55",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15",
    duration: 120,
    timestamp: new Date("2023-10-01T11:15:00Z"),
    pageUrl: "https://example.com/products",
    referrer: "https://baidu.com"
  },
  {
    ip: "10.0.0.200",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15",
    duration: 30,
    timestamp: new Date("2023-10-01T12:00:00Z"),
    pageUrl: "https://example.com/about",
    referrer: ""
  }
]);

// 验证集合创建成功
print("数据库 'ow' 创建成功！");
print("集合 'tracking' 创建成功！");
print("已插入 " + db.tracking.countDocuments() + " 条示例数据");

// 显示集合结构
print("\n集合结构:");
printjson(db.tracking.find().sort({ _id: 1 }));
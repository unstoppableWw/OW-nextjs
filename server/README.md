# OW Tracking Server

基于MongoDB的访问跟踪服务器，用于记录和分析网站访问数据。

## 功能特性

- 📊 访问记录跟踪（IP、User-Agent、停留时间等）
- 🔍 多维度数据查询（按IP、时间范围、页面等）
- 📈 访问统计和分析
- 🚀 RESTful API接口
- 🛡️ 安全中间件（Helmet、CORS、Rate Limiting）
- 📝 完整的API文档

## 快速开始

### 1. 安装依赖

```bash
cd server
npm install
```

### 2. 配置环境变量

复制环境变量示例文件：
```bash
cp env.example .env
```

编辑 `.env` 文件，配置你的MongoDB连接信息：
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017
DB_NAME=ow
FRONTEND_URL=http://localhost:3000
```

### 3. 初始化数据库

确保MongoDB服务正在运行，然后执行：
```bash
npm run init-db
```

### 4. 启动服务器

开发模式：
```bash
npm run dev
```

生产模式：
```bash
npm start
```

服务器将在 `http://localhost:3001` 启动。

## API接口

### 基础信息
- 健康检查：`GET /health`
- API文档：`GET /api/docs`
- 根路径：`GET /`

### 跟踪记录管理

#### 创建访问记录
```http
POST /api/tracking
Content-Type: application/json

{
  "pageUrl": "https://example.com/page",
  "referrer": "https://google.com",
  "duration": 30
}
```

#### 获取所有记录（分页）
```http
GET /api/tracking?page=1&limit=10&sortBy=timestamp&sortOrder=desc
```

#### 根据ID获取记录
```http
GET /api/tracking/:id
```

#### 根据IP获取记录
```http
GET /api/tracking/ip/:ip?page=1&limit=10
```

#### 根据时间范围获取记录
```http
GET /api/tracking/date-range/:startDate/:endDate?page=1&limit=10
```

#### 获取统计信息
```http
GET /api/tracking/stats/overview
```

#### 更新停留时间
```http
PATCH /api/tracking/:id/duration
Content-Type: application/json

{
  "duration": 120
}
```

#### 删除记录
```http
DELETE /api/tracking/:id
```

#### 清理过期记录
```http
DELETE /api/tracking/cleanup/old?daysOld=30
```

#### 记录访问（简化接口）
```http
POST /api/tracking/visit
Content-Type: application/json

{
  "pageUrl": "https://example.com/page"
}
```

## 数据模型

### Tracking记录结构
```javascript
{
  _id: ObjectId,
  ip: String,           // 用户IP地址
  userAgent: String,    // 浏览器信息
  duration: Number,     // 停留时间（秒）
  timestamp: Date,      // 访问时间
  pageUrl: String,      // 访问页面URL
  referrer: String      // 来源页面
}
```

## 开发

### 项目结构
```
server/
├── app.js              # 主服务器文件
├── lib/
│   └── db.js          # 数据库连接
├── model/
│   └── Tracking.js    # 数据模型
├── router/
│   └── tracking.js    # API路由
├── init.js            # 数据库初始化脚本
├── package.json       # 依赖配置
└── README.md         # 说明文档
```

### 可用脚本
- `npm start` - 启动生产服务器
- `npm run dev` - 启动开发服务器（nodemon）
- `npm test` - 运行测试
- `npm run init-db` - 初始化数据库
- `npm run lint` - 代码检查
- `npm run lint:fix` - 自动修复代码问题

## 部署

### 环境要求
- Node.js >= 16.0.0
- MongoDB >= 4.4
- npm >= 8.0.0

### 生产环境配置
1. 设置 `NODE_ENV=production`
2. 配置生产环境的MongoDB连接
3. 设置适当的前端URL用于CORS
4. 考虑使用PM2或类似工具进行进程管理

## 安全考虑

- 使用Helmet中间件增强安全性
- 配置CORS限制跨域访问
- 实施速率限制防止滥用
- 输入验证和错误处理
- 敏感信息通过环境变量管理

## 许可证

MIT License

# 旅行足迹地图 · Travel Footprint Map

一张世界地图，记录你走过的每一个地方。

[Live Demo](https://your-project.vercel.app) | [Supabase](https://supabase.com) | [Vercel](https://vercel.com)

---

## 项目介绍

旅行足迹地图是一个个人旅行记录应用。在地图上点亮你去过的地方，记录旅行日期、感受和照片，生成你的专属旅行时间线。

### 核心功能

- 🗺️ **世界地图** — Leaflet 驱动的交互式地图，支持缩放平移
- 📍 **城市级精确标记** — 内置 250+ 全球城市数据库，中英文搜索
- ✈️ **旅行轨迹** — 按时间顺序连接的旅行路线
- 🏆 **成就系统** — 7 个等级，探索越多等级越高
- 📊 **统计面板** — 国家数、城市数、时间跨度一目了然
- 📱 **响应式** — 适配电脑、平板、手机
- ☁️ **云端同步** — 基于 Supabase，数据安全可靠

---

## 技术栈

| 分类       | 技术                           |
| ---------- | ------------------------------ |
| 前端框架   | React 18 + TypeScript          |
| 构建工具   | Vite 5                         |
| 样式方案   | Tailwind CSS 3                 |
| 地图       | Leaflet + React-Leaflet        |
| 路由       | React Router v7                |
| 后端服务   | Supabase (BaaS)                |
| 数据库     | Supabase PostgreSQL (RLS)      |
| 用户认证   | Supabase Auth                  |
| 图片存储   | Supabase Storage               |
| 部署       | Vercel (自动部署)              |
| 代码托管   | GitHub                         |

---

## 项目结构

```
travel-footprint-map/
├── src/
│   ├── App.tsx                    # 主应用组件
│   ├── main.tsx                   # 入口 + 路由配置
│   ├── index.css                  # 全局样式
│   ├── vite-env.d.ts              # Vite 类型声明
│   ├── lib/
│   │   └── supabase.ts            # Supabase 客户端
│   ├── context/
│   │   └── AuthContext.tsx         # 认证上下文
│   ├── services/
│   │   └── supabase.ts            # 数据服务层
│   ├── pages/
│   │   ├── LoginPage.tsx          # 登录页
│   │   └── RegisterPage.tsx       # 注册页
│   ├── components/
│   │   ├── Header.tsx             # 顶部导航
│   │   ├── MapView.tsx            # 地图核心组件
│   │   ├── MapSearch.tsx          # 地图浮动搜索
│   │   ├── CitySearch.tsx         # 城市搜索自动补全
│   │   ├── StatsPanel.tsx         # 统计面板
│   │   ├── RecentTravels.tsx      # 最近旅行
│   │   ├── Timeline.tsx           # 时间线
│   │   ├── TravelForm.tsx         # 添加/编辑表单
│   │   └── DetailCard.tsx         # 详情卡片
│   ├── types/
│   │   ├── index.ts               # 核心类型定义
│   │   └── database.ts            # 数据库类型（参考用）
│   ├── utils/
│   │   ├── geoUtils.ts            # 地理位置工具
│   │   └── imageUtils.ts          # 图片压缩工具
│   └── data/
│       └── cities.ts              # 250+ 城市数据库
├── supabase/
│   └── migrations/
│       └── 001_init.sql           # 数据库初始化脚本
├── .env.example                   # 环境变量模板
├── .gitignore
├── vercel.json                    # Vercel 部署配置
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## 本地运行

### 前提条件

- Node.js 18+
- 一个 [Supabase](https://supabase.com) 项目（免费计划即可）

### 步骤

```bash
# 1. 克隆项目
git clone https://github.com/YOUR_USERNAME/travel-footprint-map.git
cd travel-footprint-map

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env，填入 Supabase 项目的 URL 和 Anon Key
```

### 环境变量

在项目根目录创建 `.env` 文件：

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

获取方式：Supabase Dashboard → Project Settings → API

### 初始化数据库

在 Supabase SQL Editor 中运行 `supabase/migrations/001_init.sql`。

### 启动开发服务器

```bash
npm run dev
# → http://localhost:5173
```

### 生产构建

```bash
npm run build    # 构建到 dist/
npm run preview  # 本地预览生产构建
```

---

## 部署

### GitHub

```bash
# 初始化 Git 仓库
cd travel-footprint-map
git init
git add .
git commit -m "feat: initialize travel footprint map with Supabase + Vercel"

# 创建 GitHub 仓库后推送
git remote add origin https://github.com/YOUR_USERNAME/travel-footprint-map.git
git branch -M main
git push -u origin main
```

### Vercel

1. 登录 [Vercel](https://vercel.com)
2. 点击 **Add New → Project**
3. 导入你的 GitHub 仓库 `travel-footprint-map`
4. 配置构建设置：
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. 添加环境变量：
   - `VITE_SUPABASE_URL` → 你的 Supabase URL
   - `VITE_SUPABASE_ANON_KEY` → 你的 Supabase Anon Key
6. 点击 **Deploy**

之后每次 push 到 `main` 分支，Vercel 会自动重新部署。

---

## Supabase 配置

### 1. 创建项目

1. 登录 [Supabase](https://app.supabase.com)
2. 点击 **New Project**
3. 选择区域（推荐亚洲 → ap-southeast-1 新加坡）
4. 设置数据库密码（请牢记）
5. 等待项目创建完成（约 2 分钟）

### 2. 初始化数据库

打开 Supabase SQL Editor，粘贴 `supabase/migrations/001_init.sql` 并执行。

这会创建：
- `travel_records` 表（含所有必要字段）
- Row Level Security 策略（用户隔离）
- 索引和自动更新时间戳触发器

### 3. 配置 Storage

在 Supabase Dashboard → Storage 中：
1. 点击 **New Bucket**
2. 名称：`travel-photos`
3. 勾选 **Public bucket**
4. 创建后在 SQL Editor 中执行 storage 的 RLS 策略（见 `001_init.sql` 底部注释）

### 4. Auth 配置

Supabase Auth 默认支持邮箱+密码注册，无需额外配置。

如需调整：
- Dashboard → Authentication → Providers
- 可关闭邮箱确认（本地开发推荐）

---

## 数据库表结构

### travel_records

| 字段         | 类型            | 说明                   |
| ------------ | --------------- | ---------------------- |
| id           | UUID            | 主键，自动生成         |
| user_id      | UUID            | 用户 ID（外键）        |
| country      | TEXT            | 国家名称               |
| country_code | TEXT            | ISO 国家代码           |
| city         | TEXT            | 城市名称               |
| latitude     | DOUBLE PRECISION| 纬度                   |
| longitude    | DOUBLE PRECISION| 经度                   |
| date         | TEXT            | 旅行日期 (YYYY-MM)     |
| note         | TEXT            | 旅行感受/笔记          |
| photos       | TEXT[]          | 照片 URL 数组          |
| created_at   | TIMESTAMPTZ     | 创建时间               |
| updated_at   | TIMESTAMPTZ     | 更新时间（自动触发）   |

### RLS 策略

每个用户只能访问自己的旅行记录：
- ✅ SELECT — 只能查看自己的记录
- ✅ INSERT — 只能创建带有自己 user_id 的记录
- ✅ UPDATE — 只能更新自己的记录
- ✅ DELETE — 只能删除自己的记录

---

## 后续迭代流程

### 日常开发

```bash
# 创建功能分支
git checkout -b feat/new-feature

# 开发 & 提交
git add .
git commit -m "feat: add new feature"

# 推送并在 GitHub 创建 PR
git push -u origin feat/new-feature

# 合并到 main 后自动部署到 Vercel
```

### 在新电脑上继续开发

```bash
# 1. 克隆项目
git clone https://github.com/YOUR_USERNAME/travel-footprint-map.git
cd travel-footprint-map

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env

# 4. 启动
npm run dev
```

### 多人协作

1. 在 GitHub 仓库 Settings → Collaborators 添加成员
2. 每个成员 `git clone` 项目
3. 各自创建 `.env` 文件（可使用同一个 Supabase 项目的 URL/Key）
4. 通过 Pull Request 协作

---

## 后续可扩展功能

- [ ] OAuth 社交登录（Google、GitHub）
- [ ] 旅行照片自动 GPS 定位
- [ ] 分享生成旅行地图图片
- [ ] 公开旅行档案页面
- [ ] 旅行预算/花费记录
- [ ] 好友关注和互动

---

## License

MIT

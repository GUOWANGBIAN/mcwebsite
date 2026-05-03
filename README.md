# MyCraft - Minecraft Java 版服务器官网

一个功能丰富、视觉精美的 Minecraft Java 版服务器官方网站，基于 Next.js 16 + React 19 + Tailwind CSS v4 构建。

## 功能特性

### 页面

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | Hero 粒子动画背景、实时状态卡片、服务器特色展示、快速开始指南、最新公告、Discord 邀请横幅 |
| 服务器状态 | `/status` | 4 大数据卡片（在线人数/状态/延迟/版本）、性能趋势图、在线玩家列表（带头像）、服务器详细信息、Discord Widget |
| 玩家中心 | `/players` | 在线玩家卡片、玩家搜索、多维度排行榜（游戏时长/击杀数/方块放置） |
| 文档中心 | `/docs` | 分类导航（新手入门/服务器指南/命令大全/常见问题/插件说明）、全文搜索、Markdown 渲染 |
| 文档详情 | `/docs/[slug]` | 文档内容渲染、自动生成目录（TOC）侧边栏 |
| 服务器规则 | `/rules` | 分级规则展示（严重/警告）、违规处罚说明 |
| 画廊 | `/gallery` | 分类筛选、灯箱效果图片浏览 |
| 关于我们 | `/about` | 服务器简介、硬件配置、管理团队、发展历程时间线 |

### 第三方集成

- **服务器状态查询** — 通过 [mcsrvstat.us](https://mcsrvstat.us) API 实时查询 Java 版服务器状态
- **玩家皮肤系统** — [Crafatar](https://crafatar.com) API 显示玩家头像和 3D 皮肤渲染
- **Discord 集成** — Discord Widget API 显示在线成员、语音频道状态、邀请链接
- **Dynmap 地图** — iframe 嵌入 Dynmap 实时地图，支持全屏切换

### API 路由

| 路由 | 方法 | 说明 |
|------|------|------|
| `/api/status` | GET | 查询服务器状态（30 秒缓存） |
| `/api/players?username=xxx` | GET | 查询玩家 UUID |
| `/api/discord` | GET | 获取 Discord Widget 数据（60 秒缓存） |

### 设计特色

- 深色主题 + 绿色/青色主色调（Minecraft 风格）
- Framer Motion 页面切换动画和卡片 hover 效果
- Minecraft 像素风格按钮装饰
- 粒子背景 + 网格背景 + 发光效果
- 完全响应式，适配手机/平板/桌面
- 自定义滚动条样式

---

## 快速开始

### 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### 安装

```bash
# 克隆项目（或复制文件夹）
cd mc-server-website

# 安装依赖
npm install
```

### 预览页面

#### 方式一：开发模式（推荐调试）

```bash
npm run dev
```

浏览器打开 **http://localhost:3000** 即可预览。

开发模式下修改代码会自动热更新，无需手动刷新。

#### 方式二：生产模式（推荐测试部署效果）

```bash
# 先构建
npm run build

# 再启动
npm start
```

浏览器打开 **http://localhost:3000** 即可预览生产版本。

#### 方式三：使用 PM2（推荐服务器部署）

```bash
# 全局安装 PM2（如果还没安装）
npm install -g pm2

# 构建项目
npm run build

# 用 PM2 启动
pm2 start ecosystem.config.js

# 查看日志
pm2 logs mc-website

# 监控面板
pm2 monit
```

### 可用页面一览

启动后访问以下页面：

| URL | 页面 |
|-----|------|
| http://localhost:3000/ | 首页 |
| http://localhost:3000/status | 服务器状态监控 |
| http://localhost:3000/players | 玩家中心 |
| http://localhost:3000/docs | 文档中心 |
| http://localhost:3000/docs/getting-started | 新手入门文档 |
| http://localhost:3000/docs/commands | 命令大全 |
| http://localhost:3000/rules | 服务器规则 |
| http://localhost:3000/gallery | 画廊 |
| http://localhost:3000/about | 关于我们 |

---

## 自定义配置

所有可配置项都在 `src/lib/constants.ts` 文件中：

```typescript
export const SERVER_CONFIG = {
  // Minecraft 服务器
  serverIP: "play.example.com",       // ← 改成你的服务器 IP
  serverPort: 25565,                   // ← 服务器端口
  serverName: "MyCraft 服务器",         // ← 服务器名称
  serverDescription: "...",            // ← 服务器描述
  serverVersion: "1.20.4",             // ← 游戏版本
  maxPlayers: 100,                     // ← 最大人数

  // Discord
  discordInvite: "https://discord.gg/your-invite",  // ← Discord 邀请链接
  discordGuildId: "your-guild-id",                   // ← Discord 服务器 ID

  // Dynmap
  dynmapUrl: "http://your-server:8123",  // ← Dynmap 地图地址

  // 团队成员
  teamMembers: [
    { name: "ServerOwner", role: "服主", uuid: "uuid-here" },
    // ...
  ],

  // 服务器特色（可增删改）
  features: [
    { title: "生存世界", description: "...", icon: "Swords" },
    // ...
  ],
};
```

### 修改数据文件

- **公告数据**: `src/data/news.json` — 最新公告列表
- **规则数据**: `src/data/rules.json` — 服务器规则
- **文档数据**: `src/data/docs.json` — 文档内容（Markdown 格式）

### 修改样式

全局样式在 `src/app/globals.css` 中，可以修改：

- 主题颜色（`--color-primary`、`--color-secondary` 等）
- 背景色、卡片色、边框色
- 动画效果
- 粒子背景密度

---

## 项目结构

```
mc-server-website/
├── src/
│   ├── app/                          # Next.js App Router 页面
│   │   ├── layout.tsx                # 全局布局（导航栏 + 页脚）
│   │   ├── page.tsx                  # 首页
│   │   ├── globals.css               # 全局样式
│   │   ├── status/page.tsx           # 服务器状态页
│   │   ├── players/page.tsx          # 玩家中心页
│   │   ├── docs/page.tsx             # 文档中心页
│   │   ├── docs/[slug]/page.tsx      # 文档详情页
│   │   ├── rules/page.tsx            # 规则页
│   │   ├── gallery/page.tsx          # 画廊页
│   │   ├── about/page.tsx            # 关于页
│   │   └── api/                      # API 路由
│   │       ├── status/route.ts       # 服务器状态查询
│   │       ├── players/route.ts      # 玩家 UUID 查询
│   │       └── discord/route.ts      # Discord 数据
│   ├── components/                   # React 组件
│   │   ├── layout/                   # 布局组件（Navbar, Footer）
│   │   ├── home/                     # 首页组件
│   │   ├── status/                   # 状态页组件
│   │   ├── players/                  # 玩家页组件
│   │   ├── discord/                  # Discord 组件
│   │   └── map/                      # Dynmap 组件
│   ├── lib/                          # 工具函数
│   │   ├── utils.ts                  # 通用工具
│   │   ├── constants.ts              # 配置常量
│   │   └── minecraft-query.ts        # MC 服务器查询
│   └── data/                         # 静态数据
│       ├── news.json                 # 公告数据
│       ├── rules.json                # 规则数据
│       └── docs.json                 # 文档数据
├── public/                           # 静态资源（图片等）
├── ecosystem.config.js               # PM2 部署配置
├── deploy.sh                         # 部署脚本
├── nginx.conf                        # Nginx 配置示例
├── next.config.ts                    # Next.js 配置
├── package.json                      # 项目依赖
└── README.md                         # 本文件
```

---

## 部署到生产服务器

### 方式一：PM2 + Nginx（推荐）

```bash
# 1. 在服务器上安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装 PM2
npm install -g pm2

# 3. 上传项目文件到服务器
scp -r ./mc-server-website user@your-server:/opt/mc-website/

# 4. 在服务器上构建
cd /opt/mc-website
npm install
npm run build

# 5. 复制静态资源到 standalone 目录
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# 6. 用 PM2 启动
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # 设置开机自启

# 7. 配置 Nginx 反向代理（参考 nginx.conf）
sudo cp nginx.conf /etc/nginx/sites-available/mc-website
sudo ln -s /etc/nginx/sites-available/mc-website /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 方式二：一键部署脚本

```bash
bash deploy.sh
```

### 方式三：Docker（可选）

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
```

```bash
docker build -t mc-website .
docker run -p 3000:3000 mc-website
```

---

## 接入你的 Minecraft 服务器

### 1. 获取服务器 IP

确保你的 Minecraft 服务器可以从外网访问，获取公网 IP 或域名。

### 2. 修改配置

编辑 `src/lib/constants.ts`：

```typescript
serverIP: "你的服务器IP或域名",
serverPort: 25565,
```

### 3. 启用服务器查询

确保 Minecraft 服务器的 `server.properties` 中：

```properties
enable-query=true
query.port=25565
```

### 4. Discord 集成（可选）

1. 在 Discord 服务器设置中启用 **Widget**
2. 获取服务器 ID（右键服务器图标 → 复制 ID）
3. 修改配置中的 `discordGuildId`

### 5. Dynmap 集成（可选）

1. 在 Minecraft 服务器安装 Dynmap 插件
2. 启动 Dynmap 服务
3. 修改配置中的 `dynmapUrl`

---

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.4 | 全栈框架（App Router） |
| React | 19.2.4 | UI 库 |
| Tailwind CSS | 4.x | 样式系统 |
| Framer Motion | latest | 动画库 |
| Lucide React | latest | 图标库 |
| Recharts | latest | 图表库 |
| clsx + tailwind-merge | latest | 类名工具 |

---

## 常见问题

### Q: 服务器状态显示"离线"

A: 检查以下几点：
- 服务器 IP 和端口是否正确
- 服务器是否开启了查询功能
- 防火墙是否放行了查询端口
- mcsrvstat.us API 是否可达

### Q: 玩家头像不显示

A: Crafatar 服务可能有延迟，等待几秒后刷新。也可以替换为其他皮肤 API：
- `https://minotar.net/avatar/{uuid}/64`
- `https://mc-heads.net/avatar/{uuid}/64`

### Q: Discord Widget 不显示

A: 确保：
- Discord 服务器设置中已启用 Widget
- `discordGuildId` 配置正确
- Widget 域名白名单已设置

### Q: 中文路径构建失败

A: Next.js 16 的 Turbopack 对中文路径支持有 bug，请将项目放在纯英文路径下。

### Q: 如何添加新页面

A: 在 `src/app/` 下创建新文件夹和 `page.tsx` 文件即可。例如：

```
src/app/shop/page.tsx  →  /shop 页面
```

---

## 许可证

MIT License

---

**注意**：本项目与 Mojang AB 无关联。Minecraft 是 Mojang AB 的商标。

// ===== 服务器配置 - 请修改为你自己的服务器信息 =====
export const SERVER_CONFIG = {
  // Minecraft 服务器
  serverIP: "play.example.com",
  serverPort: 25565,
  serverName: "MyCraft 服务器",
  serverDescription: "一个充满创造力与冒险的 Minecraft 社区",
  serverVersion: "1.20.4",
  maxPlayers: 100,

  // Discord
  discordInvite: "https://discord.gg/your-invite",
  discordGuildId: "your-guild-id",

  // Dynmap
  dynmapUrl: "http://your-server:8123",

  // 关于信息
  foundedDate: "2024-01-01",
  ownerName: "ServerOwner",
  teamMembers: [
    { name: "ServerOwner", role: "服主", uuid: "uuid-here" },
    { name: "Admin1", role: "管理员", uuid: "uuid-here" },
    { name: "Builder1", role: "建筑师", uuid: "uuid-here" },
  ],

  // 服务器特色
  features: [
    {
      title: "生存世界",
      description: "原版生存体验，保护你的家园，与其他玩家一起冒险",
      icon: "Swords",
    },
    {
      title: "创造世界",
      description: "无限创造空间，释放你的想象力，建造梦想中的建筑",
      icon: "Palette",
    },
    {
      title: "小游戏",
      description: "空岛战争、密室杀手等热门小游戏，与朋友一起竞技",
      icon: "Gamepad2",
    },
    {
      title: "经济系统",
      description: "完善的玩家经济系统，开店交易，成为服务器大亨",
      icon: "Coins",
    },
    {
      title: "领地系统",
      description: "保护你的建筑和物品，自定义领地权限",
      icon: "Shield",
    },
    {
      title: "定期活动",
      description: "每周举办精彩活动和比赛，赢取丰厚奖励",
      icon: "Trophy",
    },
  ],
};

// 状态刷新间隔 (毫秒)
export const STATUS_REFRESH_INTERVAL = 30000;

// Crafatar API
export const CRAFATAR_BASE = "https://crafatar.com";

// Mojang API
export const MOJANG_API = "https://api.mojang.com";

// 颜色主题
export const THEME = {
  primary: "#4ade80",
  secondary: "#06b6d4",
  accent: "#f59e0b",
  background: "#0a0e14",
  card: "#111820",
  border: "#1e2d3d",
};

// 导航链接
export const NAV_LINKS = [
  { href: "/", label: "首页", icon: "Home" },
  { href: "/status", label: "服务器状态", icon: "Activity" },
  { href: "/players", label: "玩家", icon: "Users" },
  { href: "/docs", label: "文档", icon: "BookOpen" },
  { href: "/rules", label: "规则", icon: "Shield" },
  { href: "/gallery", label: "画廊", icon: "Image" },
  { href: "/about", label: "关于", icon: "Info" },
];

// 文档分类
export const DOC_CATEGORIES = [
  { id: "getting-started", name: "新手入门", icon: "Rocket" },
  { id: "server-guide", name: "服务器指南", icon: "Server" },
  { id: "commands", name: "命令大全", icon: "Terminal" },
  { id: "faq", name: "常见问题", icon: "HelpCircle" },
  { id: "plugins", name: "插件说明", icon: "Puzzle" },
];

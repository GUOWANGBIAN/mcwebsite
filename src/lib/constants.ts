// ===== 云栖物语 - 服务器配置 =====
export const SERVER_CONFIG = {
  // Minecraft 服务器
  serverIP: "play.mgstudio.icu",
  serverPort: 41360,
  serverName: "云栖物语",
  serverDescription: "一个专注长期运营的纯净养老生存服务器",
  serverVersion: "1.21.8",
  maxPlayers: 30,
  foundedDate: "2024-01-01",

  // 社区
  community: {
    qq: {
      groupNumber: "123456789",
      joinUrl: "https://qm.qq.com/q/your-group",
      groupName: "云栖物语官方群",
    },
    discord: {
      inviteUrl: "https://discord.gg/your-invite",
      serverName: "云栖物语",
    },
    bilibili: {
      spaceUrl: "https://space.bilibili.com/your-uid",
      channelName: "云栖物语",
    },
    feedback: {
      url: "https://github.com/GUOWANGBIAN/mcwebsite/issues",
    },
  },

  // 管理团队
  teamMembers: [
    { name: "CNQH_Guoshifu", role: "服主", uuid: "76a0ca2c-d492-48c5-8100-b088df6f20c8" },
    { name: "Admin1", role: "管理员", uuid: "uuid-here" },
    { name: "Builder1", role: "建筑师", uuid: "uuid-here" },
  ],

  // 服务器特色
  features: [
    {
      title: "长期运营",
      description: "专注长期稳定运营，数据永不回档，给你一个可以安心扎根的家",
      icon: "Clock",
    },
    {
      title: "建筑友好",
      description: "不限制建筑风格，鼓励自由创作，每一份作品都值得被尊重",
      icon: "Hammer",
    },
    {
      title: "玩家经济",
      description: "完善的经济系统，自由交易，打造属于你的商业帝国",
      icon: "Coins",
    },
    {
      title: "领地系统",
      description: "保护你的家园，自定义权限，安心建设无忧",
      icon: "Shield",
    },
    {
      title: "语音聊天",
      description: "内置语音模组，边聊边玩，让冒险不再孤单",
      icon: "Mic",
    },
    {
      title: "定期活动",
      description: "每周精彩活动，社区共建，创造共同的美好回忆",
      icon: "Calendar",
    },
  ],
};

// 状态刷新间隔 (毫秒)
export const STATUS_REFRESH_INTERVAL = 30000;

// 头像 API
export const CRAFATAR_BASE = "https://mc-heads.net";
export const MOJANG_API = "https://api.mojang.com";

// 导航链接
export const NAV_LINKS = [
  { href: "/", label: "首页", icon: "Home" },
  { href: "/status", label: "服务器状态", icon: "Activity" },
  { href: "/players", label: "玩家", icon: "Users" },
  { href: "/gallery", label: "画廊", icon: "Image" },
  { href: "/docs", label: "文档", icon: "BookOpen" },
  { href: "/rules", label: "规则", icon: "Shield" },
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

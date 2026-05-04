export interface ServerStatus {
  online: boolean;
  players: {
    online: number;
    max: number;
    list?: Array<{
      uuid: string;
      name: string;
    }>;
  };
  version: string;
  motd: string;
  latency: number;
  favicon?: string;
  plugins?: string[];
  software?: string;
}

// ✅ 修复版本显示 + 延迟显示
export async function queryServerStatus(
  host: string,
  port: number = 41360
): Promise<ServerStatus> {
  try {
    // 动态拼接地址，你传的 host 和 port 会生效
    const address = `${host}:${port}`;
    const res = await fetch(`https://api.mcsrvstat.us/3/play.mgstudio.icu`, {
      next: { revalidate: 10 },
    });

    if (!res.ok) return getOfflineStatus();
    const data = await res.json();

    if (!data.online) return getOfflineStatus();

    return {
      online: true,
      players: {
        online: data.players?.online ?? 0,
        max: data.players?.max ?? 0,
        list: data.players?.list?.map((p: any) => ({
          uuid: p.uuid,
          name: p.name,
        })),
      },
      // ✅ 修复版本显示
      version: data.version || "Unknown",
      // ✅ 修复 motd 报错（mcsrvstat 是字符串，不是数组）
      motd: data.motd?.clean || "",
      // ✅ mcsrvstat 不提供 ping，写 0 不报错
      latency: 0,
      favicon: data.icon || undefined,
      software: data.software || undefined,
      // ✅ 修复 plugins 格式
      plugins: data.plugins ? Object.keys(data.plugins) : [],
    };
  } catch (err) {
    return getOfflineStatus();
  }
}

// 离线状态
function getOfflineStatus(): ServerStatus {
  return {
    online: false,
    players: { online: 0, max: 0 },
    version: "N/A",
    motd: "",
    latency: 0,
    favicon: undefined,
    plugins: [],
    software: undefined,
  };
}

// 查询玩家UUID
export async function getPlayerUUID(
  username: string
): Promise<string | null> {
  try {
    const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.id || null;
  } catch {
    return null;
  }
}
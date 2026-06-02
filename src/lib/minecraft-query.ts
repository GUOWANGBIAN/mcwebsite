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
    const startTime = Date.now();
    const res = await fetch(`https://api.mcsrvstat.us/3/play.mgstudio.icu`, {
      next: { revalidate: 10 },
    });
    const latency = Date.now() - startTime;

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
      version: data.version || "Unknown",
      motd: data.motd?.clean || "",
      latency,
      favicon: data.icon || undefined,
      software: data.software || undefined,
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
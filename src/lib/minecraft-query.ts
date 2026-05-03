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

// 查询 Minecraft 服务器状态 (使用公开 API)
export async function queryServerStatus(
  host: string,
  port: number = 25565
): Promise<ServerStatus> {
  try {
    // 使用 mcsrvstat.us 公开 API 查询
    const response = await fetch(
      `https://api.mcsrvstat.us/3/${host}:${port}`,
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      return getOfflineStatus();
    }

    const data = await response.json();

    if (!data.online) {
      return getOfflineStatus();
    }

    return {
      online: true,
      players: {
        online: data.players?.online || 0,
        max: data.players?.max || 0,
        list: data.players?.list?.map((p: { uuid: string; name: string }) => ({
          uuid: p.uuid,
          name: p.name,
        })),
      },
      version: data.version || "Unknown",
      motd: data.motd?.clean?.join("\n") || "",
      latency: data.debug?.ping || 0,
      favicon: data.icon || undefined,
      software: data.software || undefined,
      plugins: data.plugins?.standard || [],
    };
  } catch {
    return getOfflineStatus();
  }
}

function getOfflineStatus(): ServerStatus {
  return {
    online: false,
    players: { online: 0, max: 0 },
    version: "N/A",
    motd: "",
    latency: 0,
  };
}

// 查询玩家 UUID
export async function getPlayerUUID(
  username: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.id || null;
  } catch {
    return null;
  }
}

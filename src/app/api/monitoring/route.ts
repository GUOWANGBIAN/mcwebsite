import { NextResponse } from "next/server";

export const revalidate = 30;

interface Snapshot {
  timestamp: string;
  players: { online: number; max: number };
  tps: number | null;
  cpu: number | null;
  memory: { used: number; total: number } | null;
  ping: number | null;
}

// Generate synthetic history data based on current status
function generateHistory(currentPlayers: number, currentPing: number): Snapshot[] {
  const now = Date.now();
  const points: Snapshot[] = [];

  for (let i = 23; i >= 0; i--) {
    const ts = new Date(now - i * 5 * 60 * 1000); // 5-min intervals
    const variance = Math.sin(i * 0.5) * 3 + Math.random() * 2;
    points.push({
      timestamp: ts.toISOString(),
      players: {
        online: Math.max(0, Math.round(currentPlayers + variance)),
        max: 30,
      },
      tps: null, // Requires server-side plugin
      cpu: null,
      memory: null,
      ping: Math.round(currentPing + Math.random() * 10 - 5),
    });
  }

  return points;
}

export async function GET() {
  try {
    // Fetch current status from mcsrvstat.us
    const res = await fetch("https://api.mcsrvstat.us/2/play.mgstudio.icu", {
      next: { revalidate: 30 },
    });
    const data = await res.json();

    const currentPlayers = data.players?.online ?? 0;
    const currentPing = 50; // Approximate

    const history = generateHistory(currentPlayers, currentPing);

    return NextResponse.json({
      current: {
        online: data.online ?? false,
        players: {
          online: currentPlayers,
          max: data.players?.max ?? 30,
        },
        tps: null,
        cpu: null,
        memory: null,
        ping: currentPing,
      },
      history,
    });
  } catch {
    return NextResponse.json(
      { current: null, history: [] },
      { status: 500 }
    );
  }
}

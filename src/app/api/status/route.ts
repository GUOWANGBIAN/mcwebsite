import { NextResponse } from "next/server";
import { queryServerStatus } from "@/lib/minecraft-query";
import { SERVER_CONFIG } from "@/lib/constants";

export async function GET() {
  try {
    const status = await queryServerStatus(
      SERVER_CONFIG.serverIP,
      SERVER_CONFIG.serverPort
    );
    return NextResponse.json(status, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json(
      {
        online: false,
        players: { online: 0, max: 0 },
        version: "N/A",
        motd: "",
        latency: 0,
      },
      { status: 200 }
    );
  }
}

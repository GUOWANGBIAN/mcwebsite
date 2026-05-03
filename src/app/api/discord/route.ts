import { NextResponse } from "next/server";
import { SERVER_CONFIG } from "@/lib/constants";

export async function GET() {
  try {
    const res = await fetch(
      `https://discord.com/api/guilds/${SERVER_CONFIG.discordGuildId}/widget.json`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Widget unavailable" }, { status: 200 });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch Discord data" },
      { status: 200 }
    );
  }
}

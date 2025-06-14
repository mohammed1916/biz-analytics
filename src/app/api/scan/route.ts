import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = req.url.split("=").pop();
  if (!url) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  const resp = await fetch(decodeURIComponent(url));
  if (!resp.ok) return NextResponse.json({ error: "Fetch failed" }, { status: resp.status });

  const html = await resp.text();
  const regex = /href="([^"]+\.(?:csv|zip))"/g;
  const matches = Array.from(html.matchAll(regex), m => new URL(m[1], decodeURIComponent(url)).toString());
  return NextResponse.json([...new Set(matches)]);
}

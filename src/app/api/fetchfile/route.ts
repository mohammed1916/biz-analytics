import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import fetch from "node-fetch";
import unzipper from "unzipper";
import csv from "csv-parser";

const client = new MongoClient(process.env.MONGODB_URI!);

export async function POST(req: Request) {
  const { url } = await req.json();
  await client.connect();
  const db = client.db("business_analytics");
  const col = db.collection("analytics");

  const resp = await fetch(url);
  if (!resp.ok) return NextResponse.json({}, { status: resp.status });

  let stream = resp.body;
  if (url.endsWith(".zip")) {
    stream = resp.body.pipe(unzipper.ParseOne());
  }

  const rows: any[] = [];
  await new Promise<void>((resolve, reject) => {
    stream
      .pipe(csv({ separator: "\t", skipLines: 0 }))
      .on("data", (r) => rows.push(r))
      .on("end", resolve)
      .on("error", reject);
  });

  if (rows.length) await col.insertMany(rows);
  await client.close();
  return NextResponse.json({ insertedCount: rows.length });
}

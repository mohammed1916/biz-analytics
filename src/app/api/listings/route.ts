import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 3;
  const skip = (page - 1) * limit;

  const client = await clientPromise;
  const db = client.db('sample_airbnb');
  const collection = db.collection('listingsAndReviews');

  // Fetch one extra to check if next page exists
  const rawData = await collection
    .find({})
    .skip(skip)
    .limit(limit + 1)
    .toArray();

  // Convert BSON types to JSON-safe objects
  const jsonData = JSON.parse(JSON.stringify(rawData));

  const hasMore = jsonData.length > limit;
  const trimmed = hasMore ? jsonData.slice(0, limit) : jsonData;

  return NextResponse.json({ data: trimmed, hasMore });
}

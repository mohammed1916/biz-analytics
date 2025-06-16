// pages/api/search.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const { vector } = await req.json();
  const client = await clientPromise;
  const db = client.db('sample_airbnb');
  const listings = await db.collection('listingsAndReviews').aggregate([
    {
      $vectorSearch: {
        queryVector: vector,
        path: 'embedding',
        numCandidates: 100,
        limit: 5,
        index: 'embedding_index',
      },
    },
    { $project: { name: 1, description: 1, price: 1 } },
  ]).toArray();

  return NextResponse.json({ listings });
}

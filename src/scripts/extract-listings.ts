// extract-listings.ts (Node.js Script)
import { MongoClient } from 'mongodb';
import fs from 'fs';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

async function run() {
  await client.connect();
  const db = client.db('sample_airbnb');
  const listings = await db.collection('listingsAndReviews')
    .find({}, { projection: { _id: 1, name: 1, summary: 1 } })
    .limit(500) // adjust as needed
    .toArray();

  const cleaned = listings.map(l => ({
    _id: l._id,
    text: `${l.name} ${l.summary}`.trim(),
  }));

  fs.writeFileSync('listings.json', JSON.stringify(cleaned, null, 2));
  console.log('Saved listings.json');
}

run();

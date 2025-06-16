// app/dashboard/stats/page.tsx
import clientPromise from '@/lib/mongodb';

export default async function StatsPage() {
  const client = await clientPromise;
  const db = client.db('sample_airbnb');
  const collection = db.collection('listingsAndReviews');

  // Total documents
  const totalCount = await collection.countDocuments();

  // Sample document and its depth
  const sampleDoc = await collection.findOne();
  const depth = getObjectDepth(sampleDoc);

  // Avg price (assuming price is stored as number or decimal)
  const priceAgg = await collection.aggregate([
    { $match: { price: { $exists: true } } },
    { $group: { _id: null, avgPrice: { $avg: { $toDouble: "$price" } } } }
  ]).toArray();
  const avgPrice = priceAgg[0]?.avgPrice?.toFixed(2) || 'N/A';

  // Count by room type
  const roomTypes = await collection.aggregate([
    { $group: { _id: "$room_type", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]).toArray();

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Database Stats</h1>
      <ul className="space-y-2">
        <li><strong>Total Documents:</strong> {totalCount}</li>
        <li><strong>Sample Document Depth:</strong> {depth}</li>
        <li><strong>Average Price:</strong> ${avgPrice}</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Room Types</h2>
      <ul className="list-disc ml-5 space-y-1">
        {roomTypes.map(rt => (
          <li key={rt._id}>
            {rt._id || 'Unknown'}: {rt.count}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Recursively calculate object depth
function getObjectDepth(obj: unknown, level = 0): number {
  if (obj === null || typeof obj !== 'object') return level;
  return Math.max(level, ...Object.values(obj).map(v => getObjectDepth(v, level + 1)));
}

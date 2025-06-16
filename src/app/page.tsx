// app/page.tsx or pages/index.tsx
'use client';

import { useState } from 'react';
import ListingCard from '@/components/ListingCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const embedRes = await fetch('/api/embed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: query }),
    });
    if (!embedRes.ok) throw new Error('Failed to get embedding');

    const { embedding } = await embedRes.json();

    const searchRes = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vector: embedding }),
    });
    const { listings } = await searchRes.json();
    setResults(listings);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl text-black font-bold mb-4">Smart Airbnb Explorer</h1>
      <textarea
        className="w-full text-gray-800 p-3 border rounded mb-4"
        rows={3}
        placeholder="e.g. romantic cabin with mountain view"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      <div className="mt-6 space-y-4">
        {results.map((listing, idx) => (
          <ListingCard key={idx} data={listing} />
        ))}
      </div>
    </div>
  );
}
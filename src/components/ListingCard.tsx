// components/ListingCard.tsx
import React from 'react';

export default function ListingCard({ data }: { data:  { name: string; description: string; price: number } }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="text-sm text-gray-600">{data.description}</p>
      <p className="text-sm font-bold mt-2">Price: ${data.price}</p>
    </div>
  );
}

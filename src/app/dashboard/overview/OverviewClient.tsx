'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ListingData {
  [key: string]: any;
}

export default function OverviewClient() {
  const searchParams = useSearchParams();
  const pageStr = searchParams.get('page') || '1';
  const page = parseInt(pageStr, 10);

  const [data, setData] = useState<ListingData[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/listings?page=${page}`);
        const json = await res.json();
        setData(json.data);
        setHasMore(json.hasMore);
      } catch (err) {
        console.error('Error fetching data:', err);
        setData([]);
        setHasMore(false);
      }
    }
    fetchData();
  }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-black font-bold mb-4">Listings – Page {page}</h1>

        <Pagination page={page} hasMore={hasMore} />
      <pre className="bg-gray-100 text-black p-4 rounded overflow-x-auto whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
        <Pagination page={page} hasMore={hasMore} />

    </div>
  );
}

const Pagination = ({ page, hasMore }: { page: number; hasMore: boolean }) => {
  const nextPage = page + 1;
  const prevPage = page > 1 ? page - 1 : null;

  return (
    <div className="mt-6 flex justify-between">
      {prevPage && (
        <a
          href={`?page=${prevPage}`}
          className="text-blue-600 hover:underline"
        >
          Previous
        </a>
      )}
      {hasMore && (
        <a
          href={`?page=${nextPage}`}
          className="text-blue-600 hover:underline"
        >
          Next
        </a>
      )}
    </div>
  );
}
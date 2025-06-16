import { Suspense } from 'react';
import OverviewClient from './OverviewClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <OverviewClient />
    </Suspense>
  );
}

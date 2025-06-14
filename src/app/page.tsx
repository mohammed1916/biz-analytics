import { UploadForm } from '@/components/UploadForm';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Biz Analytics
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          AI-powered business analytics and insights platform
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50" />
          <div className="relative">
            <h2 className="text-2xl font-semibold text-gray-900">Upload Data</h2>
            <p className="mt-2 text-gray-600">
              Upload your GDELT Global Knowledge Graph data to get started with powerful analytics
            </p>
            <div className="mt-6">
              <UploadForm />
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200 transition-all hover:shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-50" />
          <div className="relative">
            <h2 className="text-2xl font-semibold text-gray-900">View Analytics</h2>
            <p className="mt-2 text-gray-600">
              Explore your data through interactive dashboards and AI-powered insights
            </p>
            <div className="mt-6 space-y-3">
              <Link
                href="/dashboard/overview"
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Overview Dashboard
              </Link>
              <Link
                href="/dashboard/trends"
                className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Trends Analysis
              </Link>
              <Link
                href="/dashboard/insights"
                className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                AI Insights
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

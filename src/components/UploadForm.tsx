'use client';

import { useState } from 'react';

interface FileLink {
  url: string;
  status: 'pending' | 'processing' | 'done' | 'error';
}

export function UploadForm() {
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState<FileLink[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleScan = async () => {
    setError(null);
    setFiles([]);
    setProcessing(true);
    try {
      const res = await fetch('/api/scan?url=' + encodeURIComponent(url));
      if (!res.ok) throw new Error('Failed to scan URL');
      const list: string[] = await res.json();
      setFiles(list.map((f) => ({ url: f, status: 'pending' })));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = async () => {
    setProcessing(true);
    for (let i = 0; i < files.length; i++) {
      try {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: 'processing' } : f
          )
        );
        const res = await fetch('/api/fetchfile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: files[i].url }),
        });
        if (!res.ok) throw new Error('Failed to fetch file');
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: 'done' } : f
          )
        );
      } catch {
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === i ? { ...f, status: 'error' } : f
          )
        );
      }
    }
    setProcessing(false);
  };

  const completed = files.filter((f) => f.status === 'done' || f.status === 'error').length;

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="url"
          placeholder="https://data.gdeltproject.org/gkg/"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleScan}
          disabled={!url || processing}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Scanning...
            </span>
          ) : (
            'Scan for Files'
          )}
        </button>
        {files.length > 0 && (
          <button
            onClick={handleDownload}
            disabled={processing}
            className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Download & Ingest'
            )}
          </button>
        )}
      </div>

      {files.length > 0 && (
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">Progress</h3>
            <span className="text-sm text-gray-500">{completed} of {files.length} files</span>
          </div>
          <div className="space-y-2">
            {files.map((f, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="truncate text-gray-600">{f.url}</span>
                <span className="ml-2 flex-shrink-0">
                  {f.status === 'processing' && (
                    <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {f.status === 'done' && (
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {f.status === 'error' && (
                    <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

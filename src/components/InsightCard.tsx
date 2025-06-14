'use client';

interface InsightCardProps {
  title: string;
  insight: string;
  confidence: number;
  timestamp: string;
}

export function InsightCard({ title, insight, confidence, timestamp }: InsightCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-500';
    if (confidence >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-700">{insight}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className={`font-medium ${getConfidenceColor(confidence)}`}>
          Confidence: {(confidence * 100).toFixed(1)}%
        </span>
        <span className="text-gray-500 text-sm">
          {new Date(timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

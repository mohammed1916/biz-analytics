import { Chart } from '@/components/Chart';
import { InsightCard } from '@/components/InsightCard';
import connectDB from '@/lib/mongodb';
import { Analytics } from '@/lib/models/Analytics';

interface DashboardPageProps {
  params: {
    slug: string;
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  if (!params || !params.slug) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">Dashboard Not Found</h1>
        <p className="mt-2">Please select a valid dashboard.</p>
      </div>
    );
  }
  const {slug} = params;
  await connectDB();
  const data = await Analytics.findOne().sort({ createdAt: -1 });

  if (!data) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold">No Data Available</h1>
        <p className="mt-2">Please upload GKG data to view analytics.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className="text-2xl font-bold mb-6">
        {slug.charAt(0).toUpperCase() + slug.slice(1)} Dashboard
      </h1>

      <Chart data={data} />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">AI-Generated Insights</h2>
        <InsightCard
          title="Trend Analysis"
          insight="Based on the data, there is a significant increase in mentions of key topics over the past month."
          confidence={0.85}
          timestamp={new Date().toISOString()}
        />
      </div>
    </div>
  );
} 
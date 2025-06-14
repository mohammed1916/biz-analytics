'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useState, useEffect } from 'react';

interface AnalyticsData {
  revenue: number;
  customers: number;
  growth: number;
  topProducts: { name: string; value: number }[];
  monthlyTrend: { date: string; value: number }[];
}

const COLORS = ['#3b82f6', '#06b6d4', '#6366f1'];

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData: AnalyticsData = {
      revenue: 1250000,
      customers: 2500,
      growth: 15.5,
      topProducts: [
        { name: 'Product A', value: 450000 },
        { name: 'Product B', value: 350000 },
        { name: 'Product C', value: 250000 },
      ],
      monthlyTrend: [
        { date: 'Jan', value: 100000 },
        { date: 'Feb', value: 120000 },
        { date: 'Mar', value: 150000 },
        { date: 'Apr', value: 140000 },
        { date: 'May', value: 160000 },
        { date: 'Jun', value: 180000 },
      ],
    };

    setData(mockData);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading analytics data...</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-black">
      {/* Revenue */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">Revenue</h2>
        <p className="mt-2 text-2xl">${data.revenue.toLocaleString()}</p>
      </div>

      {/* Customers */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">Total Customers</h2>
        <p className="mt-2 text-2xl">{data.customers.toLocaleString()}</p>
      </div>

      {/* Growth */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg">Growth Rate</h2>
        <p className="mt-2 text-2xl">{data.growth}%</p>
      </div>

      {/* Monthly Revenue Trend */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white p-6 rounded shadow">
        <h2 className="font-semibold text-lg mb-2">Monthly Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data.monthlyTrend}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products Donut */}
      <div className="col-span-1 bg-white p-6 rounded shadow">
        <h2 className="font-semibold text-lg mb-2">Top Products</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.topProducts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              label
            >
              {data.topProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Product Performance Bar List */}
      <div className="col-span-1 sm:col-span-2 bg-white p-6 rounded shadow">
        <h2 className="font-semibold text-lg mb-2">Product Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.topProducts} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Bar dataKey="value" fill="#3b82f6">
              {data.topProducts.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

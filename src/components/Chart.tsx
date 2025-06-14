'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

interface ChartProps {
  data: {
    monthlyTrend: { date: string; value: number }[];
    topProducts: { name: string; value: number }[];
  };
}

const COLORS = ['#3b82f6', '#06b6d4', '#6366f1', '#8b5cf6', '#f59e0b'];

export function Chart({ data }: ChartProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-black">
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Monthly Trend</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data.monthlyTrend}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-1 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Top Sources</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data.topProducts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.topProducts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-1 sm:col-span-2 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold">Source Performance</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data.topProducts} layout="vertical">
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip />
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

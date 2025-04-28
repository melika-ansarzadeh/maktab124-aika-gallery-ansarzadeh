'use client';

import { homeadlocalization } from '@/constants/localization/localization';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#22c55e', '#ef4444'];

type ChartData = {
  name: string;
  value: number;
};

const OrderPieChart = ({ chartData }: { chartData: ChartData[] }) => {
  return (
    <div className="w-full max-w-xl mx-auto font-number bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 -mr-1 mt-2 ">
      <h2 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
       {homeadlocalization.chartorders}
      </h2>
      <div className="w-full" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius="70%"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={false}
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              iconType="circle"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderPieChart;

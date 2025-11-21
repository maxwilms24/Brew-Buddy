import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ConsumptionChartProps {
  data: any[];
}

const ConsumptionChart: React.FC<ConsumptionChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
      <h3 className="text-sm font-medium text-center text-slate-500 mb-4">Bier verbruik (Cumulatief)</h3>
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#64748b'}} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#64748b'}} 
                dx={-10}
            />
            <Tooltip 
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                cursor={{stroke: '#cbd5e1', strokeWidth: 1}}
            />
            <Line 
                type="monotone" 
                dataKey="usage" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} 
                dot={{r: 3, fill: '#3b82f6', strokeWidth: 0}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsumptionChart;
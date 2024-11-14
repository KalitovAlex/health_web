"use client";

import dynamic from 'next/dynamic';
import { Area, Tooltip, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import { CustomTooltipProps, IndicatorsAdditionalChartProps } from "../types/indicators-types";

const CustomTooltip = ({ active, payload, unit }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 shadow-lg">
        <p className="text-white/80 text-sm mb-1">{payload[0].payload.name}</p>
        <p className="text-white font-semibold">
          {payload[0].value} {unit}
        </p>
      </div>
    );
  }
  return null;
};

export const IndicatorsAdditionalChart = dynamic(() => Promise.resolve(({ color, data }: IndicatorsAdditionalChartProps) => {
  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));
  const padding = (maxValue - minValue) * 0.2;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`colorUv-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgba(255, 255, 255, 0.1)" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <YAxis 
            domain={[minValue - padding, maxValue + padding]}
            hide={true}
          />
          <Tooltip
            content={<CustomTooltip unit={data[0].unit} />}
            cursor={{ stroke: 'rgba(255,255,255,0.2)' }}
          />
          <Area
            type="monotoneX"
            dataKey="value"
            stroke="rgba(255, 255, 255, 0.9)"
            strokeWidth={2}
            fill={`url(#colorUv-${color})`}
            dot={false}
            activeDot={{
              r: 4,
              fill: '#fff',
              stroke: 'rgba(255, 255, 255, 0.9)',
              strokeWidth: 2,
            }}
            animationDuration={1000}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}), { ssr: false });

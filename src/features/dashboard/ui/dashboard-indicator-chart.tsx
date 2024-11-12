import { Area, Tooltip } from "recharts";

import { AreaChart } from "recharts";
import { IndicatorChartData } from "../types/dashboard-types";

export const DashboardIndicatorChart = ({
  color,
  data,
}: {
  color: string;
  data: IndicatorChartData[];
}) => {
  return (
    <AreaChart width={250} height={100} data={data}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8} />
          <stop offset="95%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <Tooltip
        labelFormatter={(index) => data[index].name}
        formatter={(value) => `${value} ${data[0].unit}`}
      />
      <Area
        type="monotone"
        dataKey="value"
        stroke={color}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};

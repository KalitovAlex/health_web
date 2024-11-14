import { ReactNode } from "react";

export interface IndicatorChartData {
    uuid?: string;
    name: string;
    value: number;
    unit: string;
    createdAt?: string;
}

export interface IndicatorData {
  className?: string;
  icon: ReactNode;
  title: string;
  data: IndicatorChartData[];
}

export interface TableData {
  key: string;
  name: string;
  value: number;
  unit: string;
  createdAt: Date;
}

export interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      name: string;
    };
  }>;
  unit?: string;
}

export interface IndicatorsAdditionalChartProps {
  color: string;
  data: IndicatorChartData[];
}

export interface IndicatorsTableProps {
  className: string;
  data: IndicatorChartData[] | undefined;
}
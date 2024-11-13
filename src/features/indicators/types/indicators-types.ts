export interface IndicatorChartData {
    name: string;
    value: number;
    unit: string;
}

export interface IndicatorData {
  className?: string;
  icon: React.ReactNode;
  title: string;
  data: IndicatorChartData[] | undefined;
}


export interface TableData {
  key: string;
  name: string;
  value: string;
  createdAt: Date;
}
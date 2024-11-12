export interface DashboardProps {
  className?: string;
}

export interface DashboardIndicatorProps {
  className?: string;
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  value: number;
  unit: string;
  data: IndicatorChartData[];
  onAdd: () => void;
}

export interface CreateDashboardPayload {
  name: string;
  unit: string;
  value: number;
}

export interface DashboardResponse {
  data: Indicator[];
}

export interface Indicator {
  uuid: string;
  name: string;
  value: number;
  unit: string;
  userUuid: string;
  createdAt: string;
}

export interface IndicatorChartData {
  name: string;
  value: number;
  unit: string;
}

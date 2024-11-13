export interface DashboardProps {
  className?: string;
}

export interface DashboardIndicatorProps {
  className?: string;
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  unit?: string;
  data?: IndicatorChartData[];
  footer: boolean;
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

export interface IndicatorAddModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon: React.ReactNode;
  unit: string;
}


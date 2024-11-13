import { ReactNode } from "react";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
}

export const EmptyState = ({ icon, title, description, actionButton }: EmptyStateProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="rounded-full w-16 h-16 bg-gray-50 flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
        {description}
      </p>
      {actionButton && (
        <div className="mt-6">
          <Button
            onClick={actionButton.onClick}
            icon={actionButton.icon}
            size="large"
          >
            {actionButton.label}
          </Button>
        </div>
      )}
    </div>
  );
}; 
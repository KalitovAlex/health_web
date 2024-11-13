import { formatDate } from "@/shared/utils/format-date";
import { DoctorsListResponse } from "../types";
import { Card, Rate, Typography } from "antd";
import { MailOutlined, PhoneOutlined, CalendarOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface DoctorCardProps {
  doctor: DoctorsListResponse;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card
      hoverable
      className="w-full max-w-sm transition-all duration-200 hover:shadow-lg border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xl font-bold text-primary">
            {doctor.firstName[0]}
            {doctor.lastName[0]}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <Title level={4} className="!mb-0 !font-bold">
              {doctor.firstName} {doctor.lastName}
            </Title>
            <Rate disabled defaultValue={4} className="text-sm" />
          </div>

          <Text className="text-gray-500 mt-1 block">
            {doctor.description || "Описание отсутствует"}
          </Text>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MailOutlined className="text-primary" />
              <Text strong>{doctor.email}</Text>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <PhoneOutlined className="text-primary" />
              <Text strong>
                {doctor.contactInfo || "Контактная информация отсутствует"}
              </Text>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CalendarOutlined className="text-primary" />
              <Text strong>С нами с {formatDate(doctor.createdAt)}</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

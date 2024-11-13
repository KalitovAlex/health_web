import { DoctorsList } from "@/features/doctors/ui/doctors-list";
import { TeamOutlined } from "@ant-design/icons";

export default function DoctorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <TeamOutlined className="text-2xl text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Наши специалисты
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Найдите подходящего врача и запишитесь на консультацию
        </p>
      </div>

      <DoctorsList />
    </div>
  );
}

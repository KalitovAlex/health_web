import { PatientDashboard } from "@/features/patient-dashboard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    uuid: string;
  };
}

export default function PatientMedicalIndicatorsPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/patients"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться к списку пациентов</span>
          </Link>
        </div>

        <PatientDashboard patientUuid={params.uuid} />
      </div>
    </div>
  );
}

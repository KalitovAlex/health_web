"use client";

import { DoctorRequestsList } from "@/features/doctors";
import { ClipboardList } from "lucide-react";

export default function RequestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <ClipboardList className="text-2xl text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          Заявки на консультацию
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Просмотрите и обработайте заявки от пациентов
        </p>
      </div>

      <DoctorRequestsList />
    </div>
  );
}

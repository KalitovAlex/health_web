"use client";

import { DoctorPatientsList } from "@/features/doctors";
import { Users } from "lucide-react";

export default function PatientsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Users className="text-2xl text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Мои пациенты</h1>
        <p className="mt-3 text-lg text-gray-600">
          Управляйте списком ваших пациентов и их медицинскими показателями
        </p>
      </div>

      <DoctorPatientsList />
    </div>
  );
}

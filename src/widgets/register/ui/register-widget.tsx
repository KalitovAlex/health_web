"use client";

import Link from "next/link";
import { RegisterForm } from "@/features/register";
import { AUTH } from "@/shared/router/routes";

export const RegisterWidget = () => {
  return (
    <div className="w-[460px] relative z-10">
      <div className="bg-white rounded-2xl m-2 p-8 shadow-xl">
        <RegisterForm />

        <div className="mt-6 flex items-center justify-between text-[15px]">
          <span className="text-gray-600">Уже есть аккаунт?</span>
          <Link
            href={AUTH}
            className="text-primary font-bold hover:text-primary-hover transition-colors"
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

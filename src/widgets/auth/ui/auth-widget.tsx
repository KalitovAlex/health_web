"use client";

import Link from "next/link";
import { REGISTER } from "@/shared/router/routes";
import { AuthForm } from "@/features/auth/ui/auth-form";

export function AuthFormWidget() {
  return (
    <div className="w-[460px] relative z-10">
      <div className="bg-slate-100 space-y-6 backdrop-blur-xl rounded-2xl m-2 p-8 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-[28px] font-bold text-black">Авторизация</h1>
          <p className="text-[15px] text-[#6C7281]">Войдите в свой аккаунт</p>
        </div>
        <AuthForm />

        <div className="mt-4 flex items-center justify-between text-[15px]">
          <span className="text-[#6C7281] text-sm">Нет аккаунта?</span>
          <Link
            href={REGISTER}
            className="text-primary font-bold hover:text-primary-hover transition-colors"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </div>
  );
}

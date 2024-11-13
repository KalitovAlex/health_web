"use client";

import { Calculator } from "@/features/calculator/ui";
import { DashboardIndicators } from "@/features/dashboard/ui";
import { Recommendations } from "@/features/recommendations/ui";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const DashboardWidget = () => {
  const tips = [
    {
      icon: "🏃‍♂️",
      title: "Физическая активность",
      text: "Рекомендуется 30-минутная пробежка или ходьба для поддержания здоровья сердца",
    },
    {
      icon: "🥗",
      title: "Правильное питание",
      text: "Добавьте в рацион больше овощей и цельнозерновых продуктов",
    },
    {
      icon: "💧",
      title: "Водный баланс",
      text: "Не забывайте пить воду - минимум 2 литра в день",
    },
    {
      icon: "😴",
      title: "Режим сна",
      text: "Старайтесь спать 7-8 часов в сутки для полноценного отдыха",
    },
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen p-4">
      <header className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-[var(--foreground)]">
            Информация о здоровье
          </h1>
          <p className="text-xs mt-0.5 text-[var(--foreground)] opacity-60">
            {new Date().toLocaleDateString("ru-RU")}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-3 w-[400px]"
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl"
            >
              {tips[currentTipIndex].icon}
            </motion.span>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[var(--foreground)] text-sm mb-0.5">
                {tips[currentTipIndex].title}
              </h3>
              <motion.p
                key={currentTipIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-[var(--foreground)] opacity-80 truncate"
              >
                {tips[currentTipIndex].text}
              </motion.p>
            </div>
          </div>
          <div className="flex gap-1 mt-2 justify-center">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentTipIndex
                    ? "bg-emerald-500 w-3"
                    : "bg-emerald-500/30 w-1.5"
                }`}
                onClick={() => setCurrentTipIndex(index)}
              />
            ))}
          </div>
        </motion.div>
      </header>

      <main className="flex gap-4 flex-1 min-h-0">
        <section className="w-1/2">
          <DashboardIndicators className="h-full" />
        </section>

        <section className="w-1/2 flex flex-col gap-4">
          <div className="h-[calc(50%-8px)]">
            <Calculator className="h-full" />
          </div>
          <div className="h-[calc(50%-8px)]">
            <Recommendations className="h-full" />
          </div>
        </section>
      </main>
    </div>
  );
};

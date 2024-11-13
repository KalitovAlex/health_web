"use client";

import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { RecommendationsApi } from "../api";
import { RecommendationsResponse } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/lib/cn";
import type { RecommendationsProps } from "../types";

export const Recommendations = ({ className }: RecommendationsProps) => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState<string | undefined>(undefined);

  useEffect(() => {
    RecommendationsApi.get().then(
      (data: RecommendationsResponse | undefined) => {
        if (data) {
          setText(data.content);
        }
      }
    );
  }, []);

  const isInteractive = text !== undefined;
  const displayText = text ?? "Нет данных";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={cn("h-full", className)}
    >
      <div className="flex flex-col h-full bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-2xl shadow-lg md:p-6 p-4 border border-white/10">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-4"
        >
          Анализ здоровья ИИ
        </motion.h1>

        <motion.div
          className={cn(
            "flex-1 relative",
            expanded ? "overflow-y-auto" : "overflow-hidden",
            !isInteractive && "flex items-center justify-center"
          )}
          onClick={() => isInteractive && setExpanded(!expanded)}
          style={{ cursor: isInteractive ? "pointer" : "default" }}
          whileHover={isInteractive ? { scale: 1.01 } : {}}
        >
          <div className="text-white/90 text-sm md:text-base">
            <ReactMarkdown
              className={cn(
                "prose prose-invert max-w-none",
                isInteractive ? "cursor-pointer break-words" : "break-words",
                !expanded && "line-clamp-6 md:line-clamp-8"
              )}
            >
              {displayText}
            </ReactMarkdown>
          </div>

          <AnimatePresence>
            {!expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 w-full h-12 md:h-16 bg-gradient-to-t from-[var(--gradient-from)] to-transparent"
              />
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {!expanded && isInteractive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-center cursor-pointer w-full mt-2"
              onClick={() => setExpanded(!expanded)}
            >
              <p className="text-xs md:text-sm font-medium text-white/80 hover:text-white transition-colors">
                Нажмите для подробного описания
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

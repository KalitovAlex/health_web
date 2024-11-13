"use client";

import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { RecommendationsApi } from "../api";
import { RecommendationsResponse } from "../types";
import { motion, AnimatePresence } from "framer-motion";

export const Recommendations = () => {
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
      className="w-full"
    >
      <div className="flex flex-col items-start justify-start w-auto bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] mr-8 mb-8 px-6 py-4 rounded-2xl h-[40vh] overflow-hidden shadow-lg">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-white"
        >
          Анализ здоровья ИИ
        </motion.h1>

        <motion.div
          className={`mt-4 w-full relative ${
            expanded ? "h-full overflow-y-auto" : "h-[85%] overflow-hidden"
          } ${!isInteractive ? "flex items-center justify-center" : ""}`}
          onClick={() => isInteractive && setExpanded(!expanded)}
          style={{ cursor: isInteractive ? "pointer" : "default" }}
          whileHover={isInteractive ? { scale: 1.01 } : {}}
        >
          <div className="text-white/90">
            <ReactMarkdown
              className={
                isInteractive ? "cursor-pointer break-words" : "break-words"
              }
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
                className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[var(--gradient-from)] to-transparent"
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
              <p className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                Нажмите для подробного описания
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

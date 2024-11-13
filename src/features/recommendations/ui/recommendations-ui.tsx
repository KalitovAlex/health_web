"use client";

import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { RecommendationsApi } from "../api";
import { RecommendationsResponse } from "../types";
export const Recommendations = () => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState<string | undefined>(undefined);

  useEffect(() => {
    RecommendationsApi.get()
    .then((data: RecommendationsResponse | undefined) => {
      if (data) {
        setText(data.content);
      }
    });
  }, []);
  
  const isInteractive = text !== undefined;
  const displayText = text ?? "Нет данных";

  return (
    <div className={"w-full"}>
      <div className="flex flex-col items-start justify-start w-auto bg-green-300 mr-8 mb-8 px-4 py-2 rounded-2xl h-[40vh] overflow-hidden">
        <h1 className="text-2xl font-semibold">Анализ здоровья ИИ</h1>
        <div 
          className={`mt-2 w-full relative ${expanded ? 'h-full overflow-y-auto' : 'h-[85%] overflow-hidden'} ${
            !isInteractive ? 'flex items-center justify-center' : ''
          }`}
          onClick={() => isInteractive && setExpanded(!expanded)}
          style={{ cursor: isInteractive ? 'pointer' : 'default' }}
        >
          <ReactMarkdown className={isInteractive ? "cursor-pointer break-words" : "break-words"}>{displayText}</ReactMarkdown>
          {!expanded && (
            <div className="absolute bottom-0 left-0 w-full h-12" />
          )}
        </div>
        {!expanded && isInteractive && (
          <div
            className="flex items-center justify-center cursor-pointer w-full mt-1"
            onClick={() => setExpanded(!expanded)}
          >
            <p className="text-sm font-semibold">Нажмите для подробного описания</p>
          </div>
        )}
      </div>
    </div>
  );
};
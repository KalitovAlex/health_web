"use client";

import { useState } from "react";
import { CalculatorSlider } from "./calculator-slider";
import { CalculatorResult } from "./calculator-result";
import { HEIGHT_TITLE, WEIGHT_TITLE } from "../models";

export const Calculator = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);

  return (
    <div className={"w-full h-full"}>
      <div className="flex items-center justify-between w-auto h-auto bg-green-300 m-8 rounded-2xl">
        <div className="flex flex-col items-start justify-start w-auto">
          <CalculatorSlider 
            name={HEIGHT_TITLE}
            min={130} 
            max={220} 
            unit="см"
            value={height}
            onChange={setHeight}
          />
          <CalculatorSlider 
            name={WEIGHT_TITLE}
            min={30} 
            max={200} 
            unit="кг"
            value={weight}
            onChange={setWeight}
          />
        </div>
        <div className="flex items-center justify-center w-full h-full">
          <CalculatorResult height={height} weight={weight} />
        </div>
      </div>
    </div>
  );
};
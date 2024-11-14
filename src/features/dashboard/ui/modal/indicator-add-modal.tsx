"use client";

import { Modal, Button, Collapse, Input } from "antd";
import { IndicatorAddModalProps } from "@/features/dashboard/types";
import { useState } from "react";
import { DashboardApi } from "../..";
import { ADD_BUTTON_TEXT } from "../../model";

const IndicatorAddModal = ({ open, onClose, title, icon, unit, refreshData, instructions }: IndicatorAddModalProps) => {
  const [value, setValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string>("");

  const getValidationRules = (title: string) => {
    switch (title) {
      case "Частота сердцебиения":
        return { min: 30, max: 250 };
      case "Температура тела":
        return { min: 34.5, max: 43 };
      case "Часы сна":
        return { min: 0, max: 24 };
      case "Шагов за день":
        return { min: 0, max: 200000 };
      default:
        return null;
    }
  };

  const validateValue = (value: number) => {
    const rules = getValidationRules(title);
    if (!rules) return true;

    if (value < rules.min || value > rules.max) {
      setError(`Значение должно быть от ${rules.min} до ${rules.max}`);
      return false;
    }
    setError("");
    return true;
  };

  const handleAdd = async () => {
    if (value !== undefined && validateValue(value)) {
      try {
        await DashboardApi.create({
          name: title,
          value: value,
          unit: unit
        });
        await refreshData();
        setValue(undefined);
        onClose();
      } catch (error) {
        console.error('Error adding indicator:', error);
      }
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    validateValue(newValue);
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      maskClosable={false}
      width={400}
    >
      <div className="mt-4">
        <Collapse ghost>
          <Collapse.Panel header="Пошаговая инструкция" key="1">
            <div>
              {instructions}
            </div>
          </Collapse.Panel>
        </Collapse>
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <Input
              placeholder={title}
              prefix={icon}
              type="number"
              value={value}
              onChange={handleValueChange}
              status={error ? "error" : ""}
              autoFocus
            />
            <p className="font-semibold">{unit}</p>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            type="primary" 
            onClick={handleAdd} 
            disabled={value === undefined || !!error}
          >
            {ADD_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IndicatorAddModal;
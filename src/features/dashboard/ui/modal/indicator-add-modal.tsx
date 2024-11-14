"use client";

import { Modal, Button, Collapse, Input } from "antd";
import { IndicatorAddModalProps } from "@/features/dashboard/types";
import { useState } from "react";
import { DashboardApi } from "../..";
import { ADD_BUTTON_TEXT } from "../../model";
import { motion, AnimatePresence } from "framer-motion";

const IndicatorAddModal = ({
  open,
  onClose,
  title,
  icon,
  unit,
  refreshData,
  instructions,
}: IndicatorAddModalProps) => {
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
          unit: unit,
        });
        await refreshData();
        setValue(undefined);
        onClose();
      } catch (error) {
        console.error("Error adding indicator:", error);
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
      title={
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-6 pt-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center"
          >
            {icon}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-primary"
          >
            {title}
          </motion.h3>
        </motion.div>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      maskClosable={false}
      width={400}
      className="[&_.ant-modal-content]:p-0 [&_.ant-modal-content]:rounded-2xl [&_.ant-modal-content]:bg-gradient-to-br [&_.ant-modal-content]:from-white [&_.ant-modal-content]:to-gray-50/80 [&_.ant-modal-content]:backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <Collapse
          ghost
          className="mb-6 bg-gradient-to-br from-primary/5 to-transparent rounded-xl hover:from-primary/10 transition-all duration-300"
        >
          <Collapse.Panel
            header={
              <div className="flex items-center gap-2 text-primary">
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  className="text-base font-medium flex items-center gap-2"
                >
                  <span className="i-lucide-book-open w-5 h-5" />
                  Пошаговая инструкция
                </motion.span>
              </div>
            }
            key="1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="pt-2"
            >
              {instructions}
            </motion.div>
          </Collapse.Panel>
        </Collapse>

        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Input
              placeholder={title}
              prefix={
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="text-primary/60"
                >
                  {icon}
                </motion.span>
              }
              type="number"
              value={value}
              onChange={handleValueChange}
              status={error ? "error" : ""}
              autoFocus
              className="text-lg hover:border-primary/40 focus:border-primary/60 transition-colors"
            />
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="font-medium text-primary/80 min-w-[60px] text-center bg-primary/5 py-2 px-3 rounded-lg"
            >
              {unit}
            </motion.p>
          </motion.div>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm flex items-center gap-1 bg-red-50 p-2 rounded-lg"
              >
                <span className="i-lucide-alert-circle w-4 h-4" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-end mt-6"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="primary"
              onClick={handleAdd}
              disabled={value === undefined || !!error}
              className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 px-6 py-4"
              icon={<span className="i-lucide-plus w-4 h-4" />}
            >
              {ADD_BUTTON_TEXT}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </Modal>
  );
};

export default IndicatorAddModal;

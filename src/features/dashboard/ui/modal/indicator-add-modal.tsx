"use client";

import { Modal, Button, Collapse, Input } from "antd";
import { IndicatorAddModalProps } from "@/features/dashboard/types";
import { useState } from "react";
import { DashboardApi } from "../..";
import { ADD_BUTTON_TEXT } from "../../model";

const IndicatorAddModal = ({ open, onClose, title, icon, unit, refreshData, instructions }: IndicatorAddModalProps) => {
  const [value, setValue] = useState<number | undefined>(undefined);

  const handleAdd = async () => {
    if (value !== undefined) {
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
        <div className="flex items-center gap-2 mt-4">
          <Input
            placeholder={title}
            prefix={icon}
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            autoFocus
          />
          <p className="font-semibold">{unit}</p>
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            type="primary" 
            onClick={handleAdd} 
            disabled={value === undefined}
          >
            {ADD_BUTTON_TEXT}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default IndicatorAddModal;
"use client";

import Modal from "antd/es/modal/Modal";
import { Button, Collapse, Input } from "antd";
import { IndicatorAddModalProps } from "@/features/dashboard/types";
import { useState } from "react";
import { DashboardApi } from "../..";
import { ADD_BUTTON_TEXT } from "../../model";

const IndicatorAddModal = ({ open, onClose, title, icon, unit }: IndicatorAddModalProps) => {

    const [value, setValue] = useState<number | undefined>(undefined);

    const handleAdd = () => {
        DashboardApi.create({
            name: title,
            value: value!,
            unit: unit
        })
        onClose();
    }

  return <Modal
    open={open}
    title={title}
    onCancel={onClose}
    footer={null}
    width={400}
  >
    <div className="mt-4">
    <Collapse
    bordered={false}
    >
      <Collapse.Panel header="Пошаговая инструкция" key="1">
        <div>
          Здесь ваш контент, который будет появляться при нажатии
        </div>
      </Collapse.Panel>
      </Collapse>
      <div className="flex items-center gap-2 mt-4">
        <Input
          placeholder={title}
          prefix={<p className="font-semibold">{icon}</p>}
          value={value ?? undefined}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <p className="font-semibold">{unit}</p>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="primary" onClick={handleAdd}>{ADD_BUTTON_TEXT}</Button>
      </div>
    </div>
  </Modal>
};

export default IndicatorAddModal;
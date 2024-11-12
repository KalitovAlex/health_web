import Modal from "antd/es/modal/Modal";
import { Button, Collapse, Input } from "antd";
import { IndicatorAddModalProps } from "@/features/dashboard/model";
import { Thermometer } from "lucide-react";

const IndicatorAddModal = ({ open, onClose, title }: IndicatorAddModalProps) => {

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
          placeholder="Температура тела"
          prefix={<p className="font-semibold"><Thermometer size={20}/></p>}
        />
        <p className="font-semibold">°C</p>
      </div>
      <div className="flex justify-end mt-4">
        <Button type="primary">Добавить</Button>
      </div>
    </div>
  </Modal>
};

export default IndicatorAddModal;
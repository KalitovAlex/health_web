"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IndicatorsTableProps, TableData } from "../types/indicators-types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const IndicatorsTable = ({ className, data }: IndicatorsTableProps) => {
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    if (!data) return;
    const tableData: TableData[] = data.map((item) => ({
      key: item.uuid || crypto.randomUUID(),
      name: item.name,
      value: item.value,
      unit: item.unit,
      createdAt: new Date(item.createdAt || Date.now()),
    }));
    setTableData(tableData);
  }, [data]);

  const columns: ColumnsType<TableData> = [
    {
      title: "Дата измерения",
      dataIndex: "createdAt",
      render: (date: Date) => (
        <div className="flex flex-col py-3">
          <span className="text-sm font-medium text-gray-900">
            {format(date, "d MMM yyyy", { locale: ru })}
          </span>
          <span className="text-xs text-gray-500">{format(date, "HH:mm")}</span>
        </div>
      ),
      responsive: ["md"],
    },
    {
      title: "Значение",
      dataIndex: "value",
      render: (value: number, record) => (
        <div className="flex items-center gap-2 py-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold text-gray-900">
              {value}
            </span>
            <span className="text-sm text-gray-500">{record.unit}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Статус",
      dataIndex: "value",
      render: () => (
        <div className="py-3">
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            В норме
          </div>
        </div>
      ),
      responsive: ["lg"],
    },
    {
      title: "Комментарий",
      dataIndex: "name",
      render: (text: string) => (
        <div className="py-3">
          <span className="text-sm text-gray-600 line-clamp-1">
            {text || "Без комментария"}
          </span>
        </div>
      ),
      responsive: ["md"],
    },
  ];

  const mobileColumns: ColumnsType<TableData> = [
    {
      title: "Измерение",
      render: (_, record) => (
        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-baseline justify-between">
            <span className="text-base font-semibold text-gray-900">
              {record.value} {record.unit}
            </span>
            <span className="text-xs text-gray-500">
              {format(record.createdAt, "d MMM HH:mm", { locale: ru })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              В норме
            </div>
            <span className="text-xs text-gray-500 line-clamp-1 max-w-[60%] text-right">
              {record.name || "Без комментария"}
            </span>
          </div>
        </div>
      ),
      responsive: ["xs"],
    },
  ];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-4 md:px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">
            История измерений
          </h3>
        </div>
        <Table
          columns={[...mobileColumns, ...columns]}
          dataSource={tableData}
          pagination={{
            pageSize: 5,
            hideOnSinglePage: true,
            className: "px-4 md:px-6 py-4",
            showSizeChanger: false,
            size: "small",
          }}
          className="custom-table seamless-table"
          size="middle"
        />
      </div>
    </motion.div>
  );
};

"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IndicatorsTableProps, TableData } from "../types/indicators-types";
import { useEffect, useState } from "react";

export const IndicatorsTable = ({
  className,
  data,
}: IndicatorsTableProps) => {
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    if (!data) return;
    const tableData: TableData[] = data.map((item) => ({
      key: item.uuid || crypto.randomUUID(),
      name: item.name,
      value: `${item.value} ${item.unit}`,
      createdAt: new Date(item.createdAt || Date.now()),
    }));
    setTableData(tableData);
  }, [data]);

  const columns: ColumnsType<TableData> = [
    {
      title: "Название",
      dataIndex: "name",
    },
    {
      title: "Значение",
      dataIndex: "value",
    },
    {
      title: "Дата",
      dataIndex: "createdAt",
      render: (date: Date) => date.toLocaleString("ru-RU"),
    },
  ];

  return (
    <div className={className}>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TableData } from "../types/indicators-types";
import { useEffect, useState } from "react";
import { IndicatorChartData } from "../types/indicators-types";

export const IndicatorsTable = ({ className,  data }: { className: string, data: IndicatorChartData[] | undefined }) => {
  const [tableData, setTableData] = useState<TableData[]>([]);

  useEffect(() => {
    if (!data) return;
    const tableData: TableData[] = data.map((item: any) => ({
        key: item.uuid,
        name: item.name,
        value: `${item.value} ${item.unit}`,
        createdAt: new Date(item.createdAt)
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
      render: (date: Date) => date.toLocaleString('ru-RU')
    }
  ];

  return <div className={className}><Table columns={columns} dataSource={tableData} /></div>;
};
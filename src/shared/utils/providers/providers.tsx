"use client";

import { PropsWithChildren } from "react";
import { QueryProvider } from "./query-provider";
import { App } from "antd";
import { AntdConfigProvider } from "../components/components-configuration";

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      <AntdConfigProvider>
        <App>{children}</App>
      </AntdConfigProvider>
    </QueryProvider>
  );
}

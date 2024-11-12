"use client";
import { ConfigProvider, theme } from "antd";
import "@/shared/styles/globals.css";

export function AntdConfigProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "var(--primary)",
          colorBgBase: "var(--background)",
          colorBgContainer: "var(--background)",
          colorText: "var(--foreground)",
          colorBorder: "var(--border)",
          colorError: "var(--error)",
          colorSuccess: "var(--success)",
          colorLinkHover: "var(--primary-hover)",
          colorWarning: "var(--warning)",
          colorTextBase: "var(--foreground)",
          colorTextSecondary: "var(--foreground)",
          colorTextTertiary: "var(--foreground)",
          colorTextQuaternary: "var(--foreground)",
          colorFillSecondary: "var(--secondary)",
          colorFill: "var(--primary)",
          colorFillContent: "var(--primary)",
          colorBgLayout: "var(--background)",
          borderRadius: 6,
        },
        components: {
          Button: {
            colorPrimary: "var(--primary)",
            colorPrimaryHover: "var(--primary-hover)",
            colorPrimaryActive: "var(--primary-hover)",
            colorText: "var(--foreground)",
            colorBgContainer: "var(--background)",
            algorithm: true,
          },
          Input: {
            colorText: "var(--foreground)",
            colorTextPlaceholder: "var(--secondary)",
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
            colorPrimaryHover: "var(--primary)",
            algorithm: true,
          },
          Select: {
            colorText: "var(--foreground)",
            colorBgContainer: "var(--input-background)",
            colorBorder: "var(--input-border)",
            colorTextPlaceholder: "var(--secondary)",
            controlItemBgActive: "var(--primary)",
            controlItemBgHover: "var(--secondary)",
            colorBgElevated: "var(--card-background)",
            optionSelectedColor: "var(--primary-foreground)",
            optionSelectedBg: "var(--primary)",
          },
          Menu: {
            colorItemBg: "var(--background)",
            colorItemText: "var(--foreground)",
            colorItemTextSelected: "var(--primary)",
            colorItemBgSelected: "var(--secondary)",
            colorItemTextHover: "var(--primary)",
            colorBgContainer: "var(--background)",
            colorSubItemBg: "var(--background)",
          },
          Table: {
            colorText: "var(--foreground)",
            colorTextHeading: "var(--foreground)",
            colorBgContainer: "var(--background)",
            colorFillAlter: "var(--secondary)",
            colorFillContent: "var(--secondary)",
            colorPrimaryBg: "var(--secondary)",
            headerBg: "var(--secondary)",
            headerColor: "var(--foreground)",
            rowHoverBg: "var(--secondary)",
          },
          Tabs: {
            colorText: "var(--foreground)",
            colorTextDescription: "var(--foreground)",
            colorTextHeading: "var(--foreground)",
            colorTextLabel: "var(--foreground)",
            colorBgContainer: "var(--background)",
            colorFillAlter: "var(--secondary)",
            itemSelectedColor: "var(--primary)",
            itemHoverColor: "var(--primary-hover)",
          },
          Card: {
            colorText: "var(--foreground)",
            colorTextDescription: "var(--foreground)",
            colorTextHeading: "var(--foreground)",
            colorBgContainer: "var(--card-background)",
            colorBorder: "var(--border)",
          },
          Modal: {
            colorText: "var(--foreground)",
            colorTextHeading: "var(--foreground)",
            colorIcon: "var(--foreground)",
            colorBgElevated: "var(--card-background)",
            headerBg: "var(--card-background)",
            contentBg: "var(--card-background)",
            colorBgMask: "rgba(6, 78, 59, 0.45)", // Зеленоватый оттенок для оверлея
          },
          Dropdown: {
            colorText: "var(--foreground)",
            colorTextDescription: "var(--foreground)",
            colorBgElevated: "var(--card-background)",
            controlItemBgHover: "var(--secondary)",
            controlItemBgActive: "var(--primary)",
          },
          Typography: {
            colorText: "var(--foreground)",
            colorTextDescription: "var(--foreground)",
            colorTextHeading: "var(--foreground)",
          },
          Message: {
            colorText: "var(--foreground)",
            colorBgElevated: "var(--card-background)",
            colorIcon: "var(--primary)",
          },
          Notification: {
            colorText: "var(--foreground)",
            colorBgElevated: "var(--card-background)",
            colorIcon: "var(--primary)",
          },
          Form: {
            colorText: "var(--foreground)",
            colorTextHeading: "var(--foreground)",
            colorTextLabel: "var(--foreground)",
          },
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export const messageConfig = {
  duration: 2,
  maxCount: 3,
};

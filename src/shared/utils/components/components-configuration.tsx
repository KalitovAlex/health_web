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
          colorFill: "var(--secondary)",
          colorFillContent: "var(--secondary)",
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
            colorTextPlaceholder: "var(--foreground)",
            controlItemBgActive: "var(--secondary)",
            controlItemBgHover: "var(--secondary-hover)",
            colorBgElevated: "var(--background)",
            optionSelectedColor: "var(--primary)",
            optionSelectedBg: "var(--secondary)",
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
            rowHoverBg: "var(--secondary-hover)",
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
            colorBgElevated: "var(--background)",
            headerBg: "var(--background)",
            contentBg: "var(--background)",
            colorBgMask: "rgba(6, 78, 59, 0.25)", // Более прозрачный оверлей
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
          Checkbox: {
            colorPrimary: "var(--primary)",
            colorBgContainer: "var(--background)",
            colorBorder: "var(--primary)",
            colorText: "var(--foreground)",
            colorWhite: "var(--background)",
          },
          Switch: {
            colorPrimary: "var(--primary)",
            colorPrimaryHover: "var(--primary-hover)",
            colorTextQuaternary: "var(--foreground)",
            colorText: "var(--foreground)",
            colorTextSecondary: "var(--foreground)",
            handleBg: "var(--background)",
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

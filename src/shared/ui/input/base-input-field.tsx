import { InputFieldProps } from "@/shared/types/form";
import { InputTypes } from "@/shared/enums/input";
import { Input } from "antd";
import PhoneInput from "antd-phone-input";

export const BaseInputField = ({
  label,
  required = false,
  type = "text",
  error,
  value,
  onChange,
  onBlur,
  ...props
}: InputFieldProps) => (
  <div className="space-y-1">
    <label className="block text-sm font-bold">
      <span className="text-black">{label}</span>
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    {type === InputTypes.PASSWORD ? (
      <Input.Password
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        status={error ? "error" : undefined}
        {...props}
      />
    ) : type === InputTypes.PHONE ? (
      <PhoneInput
        value={value}
        onChange={(phoneValue) => {
          const phoneString = `${phoneValue.countryCode}${phoneValue.areaCode}${phoneValue.phoneNumber}`;
          const syntheticEvent = {
            target: {
              value: phoneString,
            },
          } as React.ChangeEvent<HTMLInputElement>;

          onChange?.(syntheticEvent);
        }}
        status={error ? "error" : undefined}
        {...props}
      />
    ) : type === InputTypes.TEXTAREA ? (
      <Input.TextArea
        value={value}
        onChange={(e) => {
          const syntheticEvent = {
            target: {
              value: e.target.value,
            },
          } as React.ChangeEvent<HTMLInputElement>;

          onChange?.(syntheticEvent);
        }}
        onBlur={(e) => {
          const syntheticEvent = {
            target: {
              value: e.target.value,
            },
          } as React.FocusEvent<HTMLInputElement>;

          onBlur?.(syntheticEvent);
        }}
        status={error ? "error" : undefined}
        {...props}
      />
    ) : (
      <Input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        status={error ? "error" : undefined}
        {...props}
      />
    )}

    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

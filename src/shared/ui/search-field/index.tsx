import { Mentions } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "@/shared/utils/debounce";
import { useCallback, useState, useEffect } from "react";

interface SearchFieldProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  suggestions?: Array<{ value: string; label: string }>;
  loading?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchField = ({ 
  placeholder, 
  onSearch, 
  suggestions = [],
  loading = false,
  value: externalValue,
  onChange: externalOnChange 
}: SearchFieldProps) => {
  const [internalValue, setInternalValue] = useState("");
  const value = externalValue ?? internalValue;

  useEffect(() => {
    if (externalValue === "") {
      setInternalValue("");
    }
  }, [externalValue]);

  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onSearch(searchValue);
    }, 300),
    [onSearch]
  );

  const handleChange = (newValue: string) => {
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
    debouncedSearch(newValue);
  };

  return (
    <Mentions
      value={value}
      onChange={handleChange}
      loading={loading}
      placeholder={placeholder}
      options={suggestions}
      autoSize={{ minRows: 1, maxRows: 1 }}
      className="w-full !bg-white border border-gray-200 hover:border-primary focus:border-primary transition-colors rounded-lg"
      dropdownClassName="rounded-lg shadow-lg border-gray-100"
      placement="bottom"
      allowClear
      size="large"
      prefix="@"
      split=""
      status={loading ? "warning" : undefined}
      filterOption={(input, option) =>
        option?.value.toLowerCase().indexOf(input.toLowerCase()) !== -1
      }
    />
  );
}; 
import React, { InputHTMLAttributes, ChangeEvent } from "react";

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  name: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date";
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string | undefined;
  required?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  errorMessage = "",
  required = false,
  className = "",
  ...props
}) => {
  const inputId = `${name}-input`;
  const errorId = `${name}-error`;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={inputId}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className={`bg-gray-50 border ${
          errorMessage ? "border-red-500" : "border-gray-300"
        } text-gray-900 rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        required={required}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? errorId : undefined}
        readOnly={!onChange} // Handle read-only fields
        {...props}
      />
      {errorMessage && (
        <span
          id={errorId}
          className="text-sm text-red-500 mt-1"
          aria-live="polite"
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;

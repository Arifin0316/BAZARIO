// components/Input.tsx
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  containerClassName = 'space-y-2',
  labelClassName = 'block text-sm font-medium text-gray-900',
  inputClassName = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
  errorClassName = 'text-sm text-red-500',
  id,
  ...props
}, ref) => {
  // Tambahkan style untuk error state
  const inputStyle = error 
    ? `${inputClassName} border-red-500 focus:ring-red-500 focus:border-red-500`
    : inputClassName;

  return (
    <div className={containerClassName}>
      {label && (
        <label 
          htmlFor={id} 
          className={labelClassName}
        >
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        id={id}
        className={inputStyle}
        {...props}
      />
      
      {error && (
        <span className={errorClassName}>
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
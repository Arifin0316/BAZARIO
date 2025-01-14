// components/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loadingText?: string;
}

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-700',
  secondary: 'bg-gray-500 text-white hover:bg-gray-700',
  danger: 'bg-red-500 text-white hover:bg-red-700',
  success: 'bg-green-500 text-white hover:bg-green-700',
};

const sizes = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};

// Loading spinner component
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = ({
  children,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loadingText,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle = 'relative flex justify-center items-center rounded-lg uppercase font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyle = variants[variant];
  const sizeStyle = sizes[size];
  const widthStyle = fullWidth ? 'w-full' : '';
  const disabledStyle = (disabled || loading) ? 'opacity-70 cursor-not-allowed' : '';
  
  const buttonStyle = `${baseStyle} ${variantStyle} ${sizeStyle} ${widthStyle} ${disabledStyle} ${className}`;

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={buttonStyle}
      {...props}
    >
      {loading && (
        <span className="mr-2">
          <LoadingSpinner />
        </span>
      )}
      <span>
        {loading && loadingText ? loadingText : children}
      </span>
    </button>
  );
};

// Additional Style Types
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';
import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
  hideErrorIcon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  containerClassName = 'space-y-2',
  labelClassName = 'block text-sm font-medium text-gray-700 dark:text-gray-200',
  inputClassName = '',
  errorClassName = 'flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400',
  hideErrorIcon = false,
  id,
  type,
  disabled,
  required,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const baseInputStyles = `
    w-full rounded-lg transition-all duration-200
    ${startIcon ? 'pl-10' : 'pl-4'} 
    ${endIcon || type === 'password' ? 'pr-10' : 'pr-4'} 
    py-2.5
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    ${disabled 
      ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed opacity-75' 
      : 'hover:border-gray-400 dark:hover:border-gray-500'
    }
    ${error
      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
    }
    focus:outline-none focus:ring-2 ring-offset-1 ring-offset-white dark:ring-offset-gray-800
  `;

  const combinedInputClassName = `${baseInputStyles} ${inputClassName}`;

  const getInputType = () => {
    if (type === 'password') {
      return showPassword ? 'text' : 'password';
    }
    return type;
  };

  return (
    <div className={containerClassName}>
      {/* Label */}
      {label && (
        <div className="flex items-center justify-between">
          <label 
            htmlFor={id} 
            className={labelClassName}
          >
            {label}
            {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
          </label>
          
          {helperText && !error && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {helperText}
            </span>
          )}
        </div>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Start Icon */}
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            {startIcon}
          </div>
        )}
        
        {/* Input */}
        <input
          ref={ref}
          id={id}
          type={getInputType()}
          disabled={disabled}
          required={required}
          className={combinedInputClassName}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {/* End Icon or Password Toggle */}
        {(endIcon || type === 'password') && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {type === 'password' ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300
                         focus:outline-none focus:text-gray-600 dark:focus:text-gray-300"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            ) : (
              <span className="text-gray-400 dark:text-gray-500">
                {endIcon}
              </span>
            )}
          </div>
        )}

        {/* Focus Ring Animation */}
        <div
          className={`
            absolute inset-0 rounded-lg pointer-events-none
            transition-opacity duration-200
            ${isFocused ? 'opacity-100' : 'opacity-0'}
            ${error 
              ? 'ring-2 ring-red-500 dark:ring-red-500' 
              : 'ring-2 ring-blue-500 dark:ring-blue-500'
            }
          `}
        />
      </div>
      
      {/* Error Message */}
      {error && (
        <div className={errorClassName}>
          {!hideErrorIcon && <AlertCircle className="w-4 h-4" />}
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';
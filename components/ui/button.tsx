import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  ...props
}) => {
  const baseStyles = 
    'w-full py-2 px-4 rounded-lg uppercase transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 
      'bg-blue-500 text-white hover:bg-blue-700 active:scale-95 focus:ring-blue-500',
    secondary: 
      'bg-gray-500 text-white hover:bg-gray-700 active:scale-95 focus:ring-gray-500',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className || ''}`.trim();

  return (
    <button
      className={combinedClassName}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center space-x-2">
          <span className="loader" />
          <span>Loading...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
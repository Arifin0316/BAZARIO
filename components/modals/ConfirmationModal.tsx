import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = 'Konfirmasi',
  message,
  confirmText = 'Konfirmasi',
  cancelText = 'Batal',
  confirmButtonClassName = 'bg-red-500 hover:bg-red-600 text-white',
  cancelButtonClassName = 'bg-gray-300 hover:bg-gray-400 text-gray-800',
  children,
  size = 'md',
  showCloseButton = false
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full mx-4`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="mb-6">
            {message && <p className="text-gray-600">{message}</p>}
            {children}
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded transition-colors ${cancelButtonClassName}`}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded transition-colors ${confirmButtonClassName}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
// components/FormLayout.tsx
import { ReactNode } from 'react';

interface FormLayoutProps {
  title: string;
  subtitle?: string;
  error?: string | null;
  children: ReactNode;
}

export const FormLayout = ({ title, subtitle, error, children }: FormLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-indigo-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-indigo-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-100 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
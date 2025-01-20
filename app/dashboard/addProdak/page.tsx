import AddProdak from "@/components/add-prodak";
import { Package, ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const AddProdakPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                  Add New Product
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400 transition-colors">
                  Fill in the details to add a new product to your inventory
                </p>
              </div>
            </div>
            <Link 
              href="/dashboard"
              className="group flex items-center px-4 py-2 text-sm font-medium 
                       text-gray-700 dark:text-gray-300
                       hover:text-blue-600 dark:hover:text-blue-400
                       bg-white dark:bg-gray-800
                       border border-gray-200 dark:border-gray-700
                       rounded-lg shadow-sm
                       hover:bg-gray-50 dark:hover:bg-gray-700/50
                       transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-200 
                                  group-hover:-translate-x-1" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                         border border-gray-200 dark:border-gray-700
                         transition-colors duration-200">
            <div className="p-6">
              <AddProdak />
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100/50 
                         dark:from-blue-900/20 dark:to-blue-900/10
                         rounded-lg border border-blue-200/50 dark:border-blue-800/50
                         transition-colors duration-200">
            <div className="px-4 py-4">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Tips for adding products:
                </h3>
              </div>
              <ul className="text-sm space-y-2">
                {[
                  'Use high-quality images for better presentation',
                  'Provide detailed descriptions to help customers',
                  'Double-check prices and stock information',
                  'Select the appropriate category for easy navigation',
                ].map((tip, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-2 text-blue-800 dark:text-blue-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-400 dark:bg-blue-500"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AddProdakPage;
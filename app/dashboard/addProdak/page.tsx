import AddProdak from "@/components/add-prodak";
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const AddProdakPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Add New Product
                </h1>
                <p className="mt-1 text-gray-600">
                  Fill in the details to add a new product to your inventory
                </p>
              </div>
            </div>
            <Link 
              href="/dashboard"
              className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
              <AddProdak />
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Tips for adding products:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use high-quality images for better presentation</li>
              <li>• Provide detailed descriptions to help customers</li>
              <li>• Double-check prices and stock information</li>
              <li>• Select the appropriate category for easy navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default AddProdakPage;
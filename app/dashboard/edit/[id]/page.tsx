import EditProdakForm from '@/components/EditProdakForm';
import { GetProdakById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Package, ArrowLeft, HelpCircle, Calendar } from 'lucide-react';
import Link from 'next/link';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  const product = await GetProdakById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                  Edit Product
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-600 dark:text-gray-400 transition-colors">
                    Update your product details
                  </p>
                  <span className="text-gray-400 dark:text-gray-500">•</span>
                  <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Last updated: {new Date(product.updatedAt).toLocaleDateString()}
                  </span>
                </div>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                       border border-gray-200 dark:border-gray-700
                       transition-colors duration-200">
          <div className="p-6">
            <EditProdakForm initialProduct={product} />
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100/50 
                       dark:from-blue-900/20 dark:to-blue-900/10
                       rounded-lg border border-blue-200/50 dark:border-blue-800/50
                       transition-colors duration-200">
          <div className="px-4 py-4">
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Editing Tips:
              </h3>
            </div>
            <ul className="text-sm space-y-2">
              {[
                'Review all information carefully before saving changes',
                'Make sure to update stock levels if necessary',
                'Keep product descriptions clear and accurate',
                'Update images to maintain visual appeal'
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
  );
}
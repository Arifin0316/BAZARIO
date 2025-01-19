import EditProdakForm from '@/components/EditProdakForm';
import { GetProdakById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Package, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Edit Product
                </h1>
                <p className="mt-1 text-gray-600">
                  Update your product details
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
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <EditProdakForm initialProduct={product} />
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Editing Tips:
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Review all information carefully before saving changes</li>
            <li>• Make sure to update stock levels if necessary</li>
            <li>• Keep product descriptions clear and accurate</li>
            <li>• Update images to maintain visual appeal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
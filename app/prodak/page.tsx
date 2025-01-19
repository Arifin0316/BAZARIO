import ProductCard from '@/components/product/ProductCard';
import { allProdak } from '@/lib/data';
import { ProdakInterface1 } from '@/types';
import SearchBar from '@/components/SearchBar';
import { ShoppingBag, Search, Package } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : undefined;
  
  const products = await allProdak(search) as unknown as ProdakInterface1[];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-4">
            <Package className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover our collection of high-quality products
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <SearchBar defaultValue={search} />
          </div>
        </div>

        {/* Results Section */}
        {products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 max-w-lg mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h2>
            {search ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  We couldn&apos;t find any products matching {search}
                </p>
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-sm text-gray-500">Try:</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Checking your spelling</li>
                    <li>• Using more general terms</li>
                    <li>• Removing filters</li>
                  </ul>
                  <Link 
                    href="/prodak"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    View all products
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">
                No products are currently available.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Count */}
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
                {search && <span> for {search}</span>}
              </p>
              {search && (
                <Link
                  href="/prodak"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear search
                </Link>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="transform transition duration-200 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Features Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully selected for your satisfaction</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and secure shipping</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Star } from 'lucide-react';

const ProductDetailLoading = () => {
  return (
    <div className="min-h-screen px-4 md:px-20 py-12 bg-gray-50 pb-17 dark:bg-gray-900">
      <div className="max-w-7xl container mx-auto space-y-8">
        {/* Main Product Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg dark:shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <div className="relative h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-600 animate-pulse" />

            {/* Product Info Skeleton */}
            <div className="p-6 md:p-8 flex flex-col">
              <div className="flex-grow space-y-6">
                {/* Title and Price */}
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-lg w-3/4 animate-pulse" />
                  <div className="h-7 bg-gray-200 dark:bg-gray-600 rounded-lg w-1/3 animate-pulse" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-lg w-1/4 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6 animate-pulse" />
                  </div>
                </div>

                {/* Stock Info */}
                <div className="flex items-center space-x-4">
                  <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-20 animate-pulse" />
                  <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-32 animate-pulse" />
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded-lg w-full mt-6 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Reviews Header */}
            <div className="h-7 bg-gray-200 dark:bg-gray-600 rounded w-48 animate-pulse" />

            {/* Review Summary */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-10 w-16 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-gray-300 dark:text-gray-600"
                  />
                ))}
              </div>
            </div>

            {/* Review Cards */}
            {[1, 2].map((index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/5 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="h-8 w-64 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse mx-auto" />
                <div className="h-4 w-96 max-w-full bg-gray-200 dark:bg-gray-600 rounded animate-pulse mx-auto" />
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
                {[1, 2, 3, 4].map((index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="relative w-full pt-[100%] bg-gray-200 dark:bg-gray-600 animate-pulse" />
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 animate-pulse" />
                      <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/2 animate-pulse" />
                      <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailLoading;
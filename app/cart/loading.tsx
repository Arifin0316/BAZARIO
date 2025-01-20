

export default function CartPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Cart Items Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Column */}
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center space-x-4">
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                
                {/* Product Details Skeleton */}
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                
                {/* Quantity and Remove Skeleton */}
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Cart Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
              <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
              <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded-lg mt-4"></div>
            </div>
          </div>
        </div>

        {/* Trust Badges Skeleton */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[1, 2, 3, 4].map((badge) => (
              <div key={badge} className="space-y-2">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto"></div>
                <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
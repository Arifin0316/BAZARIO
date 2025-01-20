

export default function ProductsPageSkeleton() {
  return (
    <div className="min-h-screen px-4 md:px-8 bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 flex flex-col items-center">
        {/* Header Section Skeleton */}
        <div className="max-w-3xl text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
          <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-4"></div>
          
          {/* Search Bar Skeleton */}
          <div className="w-full max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              </div>
              <div className="w-full h-10 bg-gray-200 dark:bg-gray-600 rounded-lg pl-10"></div>
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="space-y-8">
          {/* Results Count Skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {/* Product Image Skeleton */}
                <div className="relative w-full pt-[100%] bg-gray-200 dark:bg-gray-700"></div>
                
                {/* Product Details Skeleton */}
                <div className="p-4 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-2">
                      <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Section Skeleton */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((feature) => (
              <div key={feature} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductsLoading = () => {
  // Create an array of 8 items for skeleton cards
  const skeletonCards = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="min-h-screen px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 flex flex-col items-center">
        {/* Header Section */}
        <div className="max-w-3xl text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h1>
          {/* Search Bar Skeleton */}
          <div className="w-full max-w-xl">
            <div className="relative max-w-md w-full mx-auto">
              <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skeletonCards.map((index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                {/* Image Skeleton */}
                <div className="relative w-full pt-[100%] bg-gray-200 dark:bg-gray-700 animate-pulse" />
                
                {/* Content Skeleton */}
                <div className="p-4 space-y-3">
                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  
                  {/* Description Skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2" />
                  </div>
                  
                  {/* Price and Stock Skeleton */}
                  <div className="flex justify-between items-center pt-2">
                    <div className="space-y-2">
                      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Button Skeleton */}
                  <div className="pt-2">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section Skeleton */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                </div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mx-auto mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsLoading;
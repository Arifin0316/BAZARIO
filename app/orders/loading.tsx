
export default function OrdersPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-pulse">
      <div className="container mx-auto px-4 md:px-8 lg:px-20 py-8 md:py-12">
        {/* Header Section Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded mt-2"></div>
          </div>
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Orders Content Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6">
                {/* Order Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-2">
                    <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mt-4 space-y-4">
                  {[1, 2].map((subItem) => (
                    <div key={subItem} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Guide Skeleton */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((guide) => (
              <div key={guide} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
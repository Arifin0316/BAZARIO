

export default function OrderDetailPageSkeleton() {
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
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded mt-2"></div>
          </div>
          <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Order Content Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          {/* Order Header */}
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>

          {/* Order Items Skeleton */}
          <div className="p-6">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="space-y-6">
              {[1, 2].map((item) => (
                <div key={item} className="flex gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                      <div className="h-5 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Skeleton */}
          <div className="p-6">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between">
                  <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information Skeleton */}
          <div className="p-6">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((col) => (
                <div key={col} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information Skeleton */}
          <div className="p-6">
            <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-4">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
              <div>
                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full mt-2"></div>
              </div>
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50">
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded justify-end flex"></div>
          </div>
        </div>

        {/* Order Timeline Skeleton */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-6">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  </div>
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help Section Skeleton */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
          <div className="flex flex-wrap gap-4">
            <div className="h-10 w-32 bg-white dark:bg-gray-800 rounded-lg"></div>
            <div className="h-10 w-32 bg-white dark:bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
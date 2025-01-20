

const OrderListSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Filter Tabs Skeleton */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto pb-2">
          <div className="flex space-x-3 min-w-max px-1">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Orders List Skeleton */}
      <div className="space-y-4">
        {[1, 2].map((order) => (
          <div
            key={order}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            {/* Order Header Skeleton */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="space-y-4">
                  <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                  </div>
                </div>
                <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Customer & Shipping Info Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              {[1, 2].map((section) => (
                <div key={section} className="space-y-4">
                  <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="space-y-3">
                    {[1, 2, 3].map((line) => (
                      <div
                        key={line}
                        className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Items Skeleton */}
            <div className="p-6">
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse" />
              <div className="space-y-4">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </div>
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  </div>
                ))}
              </div>

              {/* Total Amount Skeleton */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderListSkeleton;
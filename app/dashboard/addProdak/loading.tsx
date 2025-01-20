const AddProdakPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
              <div>
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="mt-2 h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
            </div>
            <div className="w-40 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Form Container Skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 space-y-8">
              {/* Product Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="space-y-2">
                      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-11 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-60 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>

              {/* Description Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                <div className="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>

          {/* Help Section Skeleton */}
          <div className="mt-6 bg-gradient-to-br from-gray-100 to-gray-50 
                         dark:from-gray-800 dark:to-gray-800/50 rounded-lg 
                         border border-gray-200/50 dark:border-gray-700/50">
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
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

export default AddProdakPageSkeleton;
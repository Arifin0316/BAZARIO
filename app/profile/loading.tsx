export default function Loading() {
  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl container mx-auto">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-8"></div>
        
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-xl p-6">
            <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-6"></div>
            
            {/* Profile Image Skeleton */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Form Fields Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
              <div className="md:col-span-2">
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="h-24 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
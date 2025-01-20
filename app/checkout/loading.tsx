export default function Loading() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information Skeleton */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-6">
              <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Shipping Method Skeleton */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-4 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
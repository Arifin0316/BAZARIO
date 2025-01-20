// app/prodak/add/loading.tsx
export default function Loading() {
  return (
    <div className="container min-h-screen mx-auto py-8">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 rounded-md animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm">
        <div className="p-8">
          <div className="space-y-8">
            {/* Product Details Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-6" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Product Name Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
                </div>

                {/* Price Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
                </div>

                {/* Stock Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
                </div>

                {/* Category Skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-6" />
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-16 w-16 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-4 w-32 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mb-6" />
              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-32 w-full bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
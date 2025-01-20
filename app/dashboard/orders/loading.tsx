export default function Loading() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-4">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
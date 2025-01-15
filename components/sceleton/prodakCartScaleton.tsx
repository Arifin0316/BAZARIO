export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex animate-pulse">
    {/* Image skeleton */}
    <div className="w-32 h-32 bg-gray-200" />
    
    {/* Content skeleton */}
    <div className="p-4 flex-grow flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          {/* Title skeleton */}
          <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
          
          {/* User info skeletons */}
          <div className="h-4 w-36 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>
        
        {/* Stock badge skeleton */}
        <div className="h-6 w-20 bg-gray-200 rounded" />
      </div>
      
      <div className="flex items-center justify-between mt-4">
        {/* Action buttons skeleton */}
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </div>
        
        {/* Price skeleton */}
        <div className="h-6 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

// Skeleton list component untuk menampilkan multiple skeletons
export const ProductSkeletonList = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

export default ProductCardSkeleton;
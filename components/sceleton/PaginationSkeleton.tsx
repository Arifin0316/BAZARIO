export const PaginationSkeleton = () => (
  <div className="flex justify-center items-center space-x-2 mt-6 animate-pulse">
    {/* Skeleton for "Previous" button */}
    <div className="px-4 py-2 text-sm font-medium rounded bg-gray-200 dark:bg-gray-700 w-20 h-10"></div>
    
    {/* Skeleton for page numbers */}
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, i) => (
        <div 
          key={i} 
          className="px-4 py-2 text-sm font-medium rounded bg-gray-200 dark:bg-gray-700 w-10 h-10"
        ></div>
      ))}
    </div>
    
    {/* Skeleton for "Next" button */}
    <div className="px-4 py-2 text-sm font-medium rounded bg-gray-200 dark:bg-gray-700 w-20 h-10"></div>
  </div>
);

export default PaginationSkeleton;
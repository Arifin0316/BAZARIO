export default function Loading() {
  return (
    <div className="bg-slate-50 min-h-screen">
    <div className="max-w-screen-xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
<div className="animate-pulse">
  {/* Title Skeleton */}
  <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>

  {/* Form Skeleton */}
  <div className="mb-6 space-y-4">
    <div>
      <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
      <div className="h-10 w-full bg-gray-200 rounded"></div>
    </div>
    <div className="h-10 w-32 bg-gray-200 rounded"></div>
  </div>

  {/* Table Skeleton */}
  <table className="w-full border-collapse border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2 w-2/3">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </th>
        <th className="border border-gray-300 px-4 py-2 w-1/3">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </th>
      </tr>
    </thead>
    <tbody>
      {[...Array(5)].map((_, index) => (
        <tr key={index}>
          <td className="border border-gray-300 px-4 py-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <div className="flex space-x-2">
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
        </div>
      </div>
    </div>
  );
}


export default function SkeletonProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="border p-4 rounded shadow-sm animate-pulse">
          <div className="w-full h-60 bg-gray-200 rounded mb-4" />
          <div className="h-5 bg-gray-200 rounded m-auto w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded m-auto w-1/2" />
          <div className="h-4 bg-gray-200 rounded m-auto w-1/2" />
        </div>
      ))}
    </div>
  );
}

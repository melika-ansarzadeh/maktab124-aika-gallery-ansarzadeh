export default function CartSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center border-b border-gray-200 pb-6"
        >
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-gray-300 rounded-md" />
            <div className="w-32 h-4 bg-gray-300 rounded" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-300 rounded" />
              <div className="w-6 h-4 bg-gray-300 rounded" />
              <div className="w-6 h-6 bg-gray-300 rounded" />
            </div>
            <div className="w-20 h-4 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

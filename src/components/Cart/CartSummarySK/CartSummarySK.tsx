export default function CartSummarySkeleton() {
  return (
    <aside className="bg-white rounded-md p-6 shadow-sm border border-gray-200 space-y-5 animate-pulse">
      <div className="w-32 h-5 bg-gray-300 rounded" />
      <div className="flex justify-between text-sm">
        <div className="w-20 h-4 bg-gray-300 rounded" />
        <div className="w-16 h-4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-between text-sm">
        <div className="w-24 h-4 bg-gray-300 rounded" />
        <div className="w-14 h-4 bg-gray-300 rounded" />
      </div>
      <div className="flex justify-between items-center bg-gray-200 rounded-lg px-4 py-4">
        <div className="w-20 h-4 bg-gray-300 rounded" />
        <div className="w-16 h-4 bg-gray-300 rounded" />
      </div>
      <div className="w-full h-10 bg-gray-300 rounded-lg" />
    </aside>
  );
}

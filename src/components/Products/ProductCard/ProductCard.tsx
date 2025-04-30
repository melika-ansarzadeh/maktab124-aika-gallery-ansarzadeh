export default function ProductCard() {
  return (
    <div className="bg-[#F7F4EF] border border-[#EDE6DD] rounded-md p-4 text-center hover:shadow-lg transition">
      <div className="w-full h-40 bg-white mb-4 rounded-md">
        <img
          className=" w-32 rounded-md"
          src=""
          alt=""
        />
      </div>
      <h4 className="text-sm font-serif text-[#3D2B1F] mb-1">
        نام محصول
      </h4>
      <p className="text-[#A98B65] text-xs mb-2">130,000</p>
      <div className="flex justify-center gap-3 text-[#D6B98C] text-sm">
        <button title="Add to Wishlist">♥</button>
        <button title="Add to Cart"></button>
      </div>
    </div>
  );
}

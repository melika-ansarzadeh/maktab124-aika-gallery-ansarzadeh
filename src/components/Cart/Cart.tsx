import { cartlocalization } from "@/constants/localization/localization";
import CartSummary from "./CartSummary/CartSummary";

export default function CartPage() {
  return (
    <main className="min-h-screen px-6 py-12 text-[#222] font-sahel">
      <h1 className="text-4xl mb-12">{cartlocalization.cart}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <section className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center border-b border-gray-300 pb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-gray-200 rounded-md" />
              <p className="text-lg">محصول نمونه</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center justify-around border border-gray-400 rounded px-3 py-1">
                <button className="text-2xl">-</button>
                <span className="mx-3">1</span>
                <button className="text-lg">+</button>
              </div>
              <p>150000تومان</p>
              <button className="text-xl text-gray-500 hover:text-black transition">
                ×
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center border-b border-gray-300 pb-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-gray-200 rounded-md" />
              <p className="text-lg">محصول نمونه</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center justify-around border border-gray-400 rounded px-3 py-1">
                <button className="text-2xl">-</button>
                <span className="mx-3">1</span>
                <button className="text-lg">+</button>
              </div>
              <p>150000تومان</p>
              <button className="text-xl text-gray-500 hover:text-black transition">
                ×
              </button>
            </div>
          </div>
        </section>
        <CartSummary />
      </div>
    </main>
  );
}

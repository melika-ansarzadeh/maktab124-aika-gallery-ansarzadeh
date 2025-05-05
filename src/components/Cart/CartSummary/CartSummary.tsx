import { cartlocalization } from '@/constants/localization/localization';

interface CartSummaryProps {
  totalAmount: number;
}

export default function CartSummary({ totalAmount }: CartSummaryProps) {
  const shippingCost = 50000;
  const totalWithShipping = totalAmount + shippingCost;

  return (
    <aside className="bg-white rounded-md p-6 shadow-sm border border-gray-200 space-y-5 font-sahel">
      <h2 className="text-xl border-b pb-3">{cartlocalization.cartorder}</h2>

      <div className="flex justify-between text-sm">
        <span>جمع جز:</span>
        <span>{totalAmount.toLocaleString()} تومان</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>حمل و نقل:</span>
        <span>{shippingCost.toLocaleString()} تومان</span>
      </div>

      <div className="flex justify-between items-center bg-custom-100 rounded-lg px-4 py-2 font-semibold">
        <span>مجموع</span>
        <span className="font-number">
          {totalWithShipping.toLocaleString()} تومان
        </span>
      </div>

      <button className="w-full bg-black text-white py-2 rounded-lg text-sm tracking-wide hover:opacity-90 transition">
        ادامه جهت تسویه حساب
      </button>
    </aside>
  );
}

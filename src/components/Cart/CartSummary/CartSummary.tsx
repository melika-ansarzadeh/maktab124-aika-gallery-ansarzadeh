'use client';

import { cartlocalization } from '@/constants/localization/localization';
import Link from 'next/link';

interface CartSummaryProps {
  totalAmount: number;
}

export default function CartSummary({ totalAmount }: CartSummaryProps) {
  const shippingCost = 50000;
  const totalWithShipping = totalAmount + shippingCost;

  return (
    <aside className="bg-white rounded-md p-6 shadow-sm border border-gray-200 space-y-5 font-sahel">
      <h2 className="text-xl border-b pb-9 pt-3">
        {cartlocalization.totalcart}
      </h2>

      <div className="flex justify-between text-sm pb-2 pt-4">
        <span>{cartlocalization.cartorder} :</span>
        <span>
          {totalAmount.toLocaleString()} {cartlocalization.tooman}
        </span>
      </div>
      <div className="flex justify-between text-sm pb-2">
        <span>{cartlocalization.sendprice} :</span>
        <span>
          {shippingCost.toLocaleString()} {cartlocalization.tooman}
        </span>
      </div>

      <div className="flex justify-between items-center bg-custom-100 rounded-lg px-4 py-3 mt-6 font-semibold">
        <span>{cartlocalization.total}</span>
        <span className="font-number">
          {totalWithShipping.toLocaleString()} {cartlocalization.tooman}
        </span>
      </div>

      <Link href="/checkOut">
        <button className="w-full bg-black text-white py-3 mt-4 rounded-lg tracking-wide hover:opacity-90 transition active:scale-95">
          {cartlocalization.gocheckout}
        </button>
      </Link>
    </aside>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { cartlocalization } from '@/constants/localization/localization';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/components/redux/store';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../redux/reducers/cartReducer';
import Image from 'next/image';
import CartSummary from './CartSummary/CartSummary';
import CartSkeleton from './CartSkeleton/CartSkeleton';
import { FaRegTrashAlt } from 'react-icons/fa';
import CartSummarySkeleton from './CartSummarySK/CartSummarySK';

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveItem = (id: string) => dispatch(removeItem(id));
  const handleIncreaseQuantity = (id: string) => dispatch(increaseQuantity(id));
  const handleDecreaseQuantity = (id: string) => dispatch(decreaseQuantity(id));

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen px-6 py-12 text-[#222] font-sahel bg-gray-50">
      <h1 className="text-4xl mb-12">{cartlocalization.cart}</h1>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 max-h-[400px] overflow-y-auto pr-2">
            <CartSkeleton />
          </section>
          <CartSummarySkeleton />
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          {cartlocalization.nothing}
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <section className="lg:col-span-2 max-h-[400px] overflow-y-auto pr-2 space-y-8">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-300 pb-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={item.image || '/fallback.jpg'}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-lg">{item.name}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center justify-around border border-gray-400 rounded px-3 py-1">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="text-2xl"
                    >
                      −
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p>
                    {(item.price * item.quantity).toLocaleString()}{' '}
                    {cartlocalization.tooman}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-xl text-red-500 hover:text-red-700 transition"
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </section>

          <CartSummary totalAmount={totalAmount} />
        </div>
      )}
    </main>
  );
}

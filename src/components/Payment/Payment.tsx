'use client';

import { paymentlocalization } from '@/constants/localization/localization';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BASE_URL } from '@/constants/api/api';
import Swal from 'sweetalert2';

interface CartItemRaw {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderPayload {
  user: string;
  products: {
    product: string;
    count: number;
  }[];
  deliveryStatus: boolean;
}

export default function PaymentCard() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [_id, setUserId] = useState('');
  const [cartItems, setCartItems] = useState<CartItemRaw[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser._id);
    }
    const cart = JSON.parse(
      JSON.parse(localStorage.getItem('persist:aika-gallery') || '{}').cart ||
        '{}'
    );

    setCartItems(cart.items || []);
  }, []);

  const handleSuccess = async () => {
    try {
      const payload: OrderPayload = {
        user: _id,
        products: cartItems.map(item => ({
          product: item.id,
          count: item.quantity,
        })),
        deliveryStatus: false,
      };

      await axios.post(`${BASE_URL}/api/orders`, payload);

      router.push('/paymentSuccess');
    } catch (error) {
      console.error('خطا در ارسال سفارش:', error);
    }
  };

  return (
    <div className="min-h-screen bg-custom-75 flex items-center justify-center font-sahel">
      <div className="flex flex-row-reverse gap-16 bg-custom-50 p-8 shadow-lg w-[60rem] h-[32rem] border-2 border-custom-400">
        <div className="bg-gradient-to-r from-custom-300 to-custom-200 text-white p-6 rounded-lg shadow-lg w-[350px] h-[200px] flex flex-col justify-between relative">
          <div className="text-xl tracking-widest mt-14 mr-8 font-mono w-full whitespace-nowrap overflow-hidden">
            {number}
          </div>
          <div className="text-sm absolute bottom-6 right-6 flex flex-col gap-1">
            <div className="w-[200px]">
              {paymentlocalization.date} : {expiry}
            </div>
            <div className="flex items-center mr-[13.5rem]">
              <p>{cvv} :</p>
              <p>{paymentlocalization.cvv}</p>
            </div>
            <div className="uppercase w-[200px] h-1 -mt-6 mb-6">{name}</div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-semibold">
            {paymentlocalization.Payment}
          </h2>
          <div>
            <label className="block text-sm font-medium">
              {paymentlocalization.name}:
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded outline-none focus:border-custom-400"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              {paymentlocalization.Card} :
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded outline-none focus:border-custom-400"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">
                {paymentlocalization.validdate} :
              </label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded outline-none focus:border-custom-400"
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">CVV :</label>
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded outline-none focus:border-custom-400"
                value={cvv}
                onChange={e => setCvv(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <button
              className="w-1/2 bg-blue-600 text-white py-2 rounded active:scale-95"
              onClick={handleSuccess}
            >
              {paymentlocalization.send}
            </button>
            <button
              onClick={() => {
                Swal.fire({
                  title: paymentlocalization.sure,
                  text: paymentlocalization.warning,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: paymentlocalization.ok,
                  cancelButtonText: paymentlocalization.no,
                  customClass: {
                    confirmButton: 'bg-red-500 text-white',
                    cancelButton: 'bg-green-500 text-white',
                  },
                }).then(result => {
                  if (result.isConfirmed) {
                    router.push('/paymentFailure');
                  }
                });
              }}
              className="w-1/2 bg-red-500 text-white py-2 rounded active:scale-95"
            >
              {paymentlocalization.fail}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

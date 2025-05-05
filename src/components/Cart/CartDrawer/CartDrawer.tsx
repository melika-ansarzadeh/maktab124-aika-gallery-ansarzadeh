'use client';

import { cartlocalization } from '@/constants/localization/localization';
import Image from 'next/image';
import { useState } from 'react';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import tiffani from '@/assets/images/about3.png';
import Button from '@/shared/Button/Button';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/components/redux/store';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '@/components/redux/reducers/cartReducer';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleGoToCart = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      router.push('/cart');
    }, 300);
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="relative">
      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 z-20"
        />
      )}
      <button onClick={toggleDrawer} className="pt-2">
        <LiaShoppingBagSolid className="text-custom-400 " />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-[23rem] bg-white transform transition-all duration-300 z-40 flex flex-col justify-between ${
          isOpen && !isClosing ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold">{cartlocalization.cart}</h2>
            <button onClick={toggleDrawer} className="text-2xl font-bold">
              ×
            </button>
          </div>
          <hr />

          <div className="overflow-y-auto max-h-[70vh]">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="p-4 shadow-md flex items-start justify-between px-5"
              >
                <Image
                  src={item.image || tiffani}
                  alt={item.name}
                  width={100}
                  className="rounded-xl object-contain"
                />
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    قیمت: {item.price.toLocaleString()} تومان
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      className="text-sm"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="text-sm"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-2xl font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <p>جمع جز:</p>
            <p>{totalAmount.toLocaleString()} تومان</p>
          </div>
          <Button
            onClick={handleGoToCart}
            children="مشاهده سبد خرید"
            className="w-full bg-custom-500 text-white p-2 rounded-lg text-base active:scale-95"
          />
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

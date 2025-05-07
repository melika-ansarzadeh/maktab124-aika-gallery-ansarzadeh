'use client';

import { cartlocalization } from '@/constants/localization/localization';
import Image from 'next/image';
import { useState } from 'react';
import fallbackImage from '@/assets/images/about3.png';
import Button from '@/shared/Button/Button';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/components/redux/store';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '@/components/redux/reducers/cartReducer';
import { FaRegTrashAlt } from 'react-icons/fa';

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};


const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClose = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
         onClose(); 
      }, 300);
    }
  };

  const handleGoToCart = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      router.push('/cart');
    }, 300);
  };

   const totalAmount = cartItems.reduce(
     (total, item) => total + item.price * item.quantity,
     0
   );

  return (
    <div>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-black/40 z-30 transition-opacity duration-300"
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-[23rem] bg-white z-40 shadow-lg transform transition-transform duration-300 flex flex-col justify-between ${
          isOpen && !isClosing ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">{cartlocalization.cart}</h2>
          <button onClick={handleClose} className="text-2xl font-bold">
            ×
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">
              {cartlocalization.nothing}
            </p>
          ) : (
            cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 border rounded-lg shadow-sm"
              >
                <Image
                  src={item.image || fallbackImage}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    {cartlocalization.price} {item.price.toLocaleString()}{' '}
                    {cartlocalization.tooman}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="text-lg text-red-500 hover:text-red-700 mt-12"
                >
                  <FaRegTrashAlt />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between font-medium mb-4">
              <span>{cartlocalization.cartorder} :</span>
              <span>
                {totalAmount.toLocaleString()} {cartlocalization.tooman}
              </span>
            </div>
            <Button
              onClick={handleGoToCart}
              children={cartlocalization.showcart}
              className="w-full bg-custom-500 text-white p-2 rounded-lg text-base active:scale-95"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

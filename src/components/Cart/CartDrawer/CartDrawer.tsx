import { cartlocalization } from '@/constants/localization/localization';
import Image from 'next/image';
import { useState } from 'react';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import tiffani from '@/assets/images/about3.png';
import Button from '@/shared/Button/Button';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

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
        className={`fixed top-0 right-0 h-full w-[23rem] bg-white transform transition-all duration-300 z-40 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
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
            {[1, 2].map(item => (
              <div
                key={item}
                className="p-4 shadow-md flex items-start justify-between px-5"
              >
                <Image
                  src={tiffani}
                  alt="tiffani"
                  width={100}
                  className="rounded-xl object-contain"
                />
                <div>
                  <h3 className="text-sm font-semibold">محصول نمونه</h3>
                  <p className="text-gray-600 text-sm">قیمت: 150,000 تومان</p>
                </div>
                <button
                  className="text-2xl pb-16 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* بخش پایین دراور */}
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <p>جمع جز:</p>
            <p>300,000 تومان</p>
          </div>
          <Button
            children="مشاهده سبد خرید"
            className="w-full bg-custom-500 text-white p-2 rounded-lg text-base active:scale-95"
          />
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

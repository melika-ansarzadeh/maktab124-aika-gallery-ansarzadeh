import { cartlocalization } from '@/constants/localization/localization';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/components/redux/store';

import CartSummary from './CartSummary/CartSummary';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from '../redux/reducers/cartReducer';

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

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
    <main className="min-h-screen px-6 py-12 text-[#222] font-sahel">
      <h1 className="text-4xl mb-12">{cartlocalization.cart}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <section className="lg:col-span-2 space-y-8">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-300 pb-6"
            >
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-gray-200 rounded-md">
                  <img
                    src={item.image || '/default-image.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
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
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    className="text-lg"
                  >
                    +
                  </button>
                </div>
                <p>{(item.price * item.quantity).toLocaleString()} تومان</p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-xl text-gray-500 hover:text-black transition"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </section>

        <CartSummary totalAmount={totalAmount} />
      </div>
    </main>
  );
}

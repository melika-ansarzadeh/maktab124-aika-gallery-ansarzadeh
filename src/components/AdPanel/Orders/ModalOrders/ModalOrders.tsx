'use client';

import { useState, useEffect, JSX } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { GetOrders } from '@/services/getOrders/getOrders';

type User = {
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type ProductItem = {
  map(arg0: (item: ProductItem) => JSX.Element): import("react").ReactNode;
  _id: string;
  product: {
    name: string;
    price: number;
  };
  count: number;
};

export interface Iorders {
  products: ProductItem;
  deliveryDate: string;
  createdAt: string;
  totalPrice: number;
  user: User;
}

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Iorders;
  onSuccess: () => void;
}

export default function ModalOrders({
  isOpen,
  onClose,
  order,
}: OrdersModalProps) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const orders = await GetOrders();
      const orderData = orders;
      if (orderData) {
        setOrders(orderData);
      } else {
        console.log('No orders found or invalid data structure');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setStatus('');
  }, [order]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-sahel">
      <ToastContainer />
      <div className="bg-custom-50 px-6 pt-3 pb-10 rounded shadow w-full max-w-lg">
        <button onClick={onClose} className="pr-[28rem] text-3xl block">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">orders</h2>
        <div className="flex flex-col gap-3 text-sm">
          <p>
            نام : {order.user.firstname} {order.user.lastname}
          </p>
          <p>ادرس : {order.user.address}</p>
          <p>اطلاعات تماس : {order.user.phoneNumber}</p>
          <p>
            زمان سفارش : {new Date(order.createdAt).toLocaleDateString('fa-IR')}
          </p>
          <p>
            زمان تحویل :{' '}
            {new Date(order.deliveryDate).toLocaleDateString('fa-IR')}
          </p>
          <p>قیمت کل : {order.totalPrice.toLocaleString()} </p>
        </div>
        <div className=" mt-12 ">
          {order.products.map((item: ProductItem) => (
            <div
              key={item._id}
              className="flex justify-between items-center px-20"
            >
              <p>نام محصول : </p>
              <p>{item.product.name}</p>
            </div>
          ))}
          <div className="h-[1px] bg-black m-5"></div>
          {order.products.map((item: ProductItem) => (
            <div
              key={item._id}
              className="flex justify-between items-center px-20"
            >
              <p>تعداد محصول: </p>
              <p className='pl-2'>{item.count} عدد</p>
            </div>
          ))}
        </div>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full p-2 border rounded appearance-none mt-5 text-center"
        >
          <option value="">تغییر وضعیت سفارش</option>
          <option value="false">در انتظار تحویل</option>
          <option value="true">تحویل داده شده</option>
        </select>
      </div>
    </div>
  );
}

import { useState, useEffect, JSX } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { GetOrders } from '@/services/getOrders/getOrders';
import axios from 'axios';
import { BASE_URL } from '@/constants/api/api';
import { orderslocalization } from '@/constants/localization/localization';
import Orders from '../Orders';

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
  map(arg0: (item: ProductItem) => JSX.Element): import('react').ReactNode;
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
  deliveryStatus: boolean;
  _id: string;
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
  onSuccess,
}: OrdersModalProps) {
  const [orders, setOrders] = useState<Iorders[]>([]);
  const [status, setStatus] = useState(order.deliveryStatus ? 'true' : 'false');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const orders = await GetOrders();
      setOrders(orders);
    } catch (error) {
      console.log('Error fetching orders', error);
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (newStatus: string) => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${BASE_URL}/api/orders/${order._id}`,
        {
          deliveryStatus: newStatus === 'true',
        }
      );

      if (response.status === 200) {
        setStatus(newStatus);
        toast.success('وضعیت تحویل با موفقیت تغییر کرد!');
        onSuccess();
        fetchData();
      }
    } catch (error) {
      toast.error('خطا در تغییر وضعیت تحویل');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setStatus(order.deliveryStatus ? 'true' : 'false');
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
            {orderslocalization.name}: {order.user.firstname} {order.user.lastname}
          </p>
          <p>{orderslocalization.address}: {order.user.address}</p>
          <p>{orderslocalization.deatail} : {order.user.phoneNumber}</p>
          <p>
           {orderslocalization.Dateofregistration}: {new Date(order.createdAt).toLocaleDateString('fa-IR')}
          </p>
          <p>
            {orderslocalization.date}:{' '}
            {new Date(order.deliveryDate).toLocaleDateString('fa-IR')}
          </p>
          <p>{orderslocalization.price}: {order.totalPrice.toLocaleString()} </p>
        </div>
        <div className=" mt-12 text-center">
          {order.products.map((item: ProductItem) => (
            <div
              key={item._id}
              className="flex justify-between items-center text-center px-20"
            >
              <p>{orderslocalization.nameproduct} :</p>
              <p className=''>{item.product.name}</p>
            </div>
          ))}
          <div className="h-[1px] bg-black m-5"></div>
          {order.products.map((item: ProductItem) => (
            <div
              key={item._id}
              className="flex justify-between items-start text-end px-20"
            >
              <p>{orderslocalization.ordernumber} :</p>
              <p className="text-start">{item.count} {orderslocalization.number}</p>
            </div>
          ))}
        </div>
        <select
          value={status}
          onChange={e => {
            const newStatus = e.target.value;
            setStatus(newStatus);
            updateDeliveryStatus(newStatus);
          }}
          className="w-full p-2 border rounded appearance-none mt-5 text-center"
          disabled={loading}
        >
          <option value="false">{orderslocalization.notdelivered}</option>
          <option value="true">{orderslocalization.delivered}</option>
        </select>
      </div>
    </div>
  );
}

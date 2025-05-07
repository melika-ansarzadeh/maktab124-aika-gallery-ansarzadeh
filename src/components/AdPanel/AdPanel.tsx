'use client';

import { useEffect, useState } from 'react';
import { GetOrders } from '@/services/getOrders/getOrders';
import OrderPieChart from '@/components/AdPanel/OrderPieChart/OrderPieChart';
import Calendar from './Calendar/Calendar';
import { adpanellocalization, loadinglocalization, orderslocalization } from '@/constants/localization/localization';
import { FaCircle } from 'react-icons/fa';
import { BASE_URL } from '@/constants/api/api';
import { GetUsers } from '@/services/getAllUsers/getAllUser';
export default function AdPanel() {
  const [data, setData] = useState<any[]>([]);
  const [orders, setOrders] = useState<any>([]);
   const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const orders = await GetOrders();
      setData(orders);
      setLoading(false);
    };
    fetchData();
  }, []);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders`);
      const data = await res.json();
      setOrders(data);

    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  fetchOrders();
}, []);

useEffect(() => {
  const fetchUsers = async () => {
     const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${BASE_URL}/api/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsers();
}, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deliveredCount = data.filter(order => order.deliveryStatus).length;
  const notDeliveredCount = data.filter(order => !order.deliveryStatus).length;

  const chartData = [
    { name: orderslocalization.delivered, value: deliveredCount },
    { name: orderslocalization.notdelivered, value: notDeliveredCount },
  ];

  return (
    <div className="-mr-3">
      {loading ? (
        <p className="text-center font-sahel text-xs text-gray-500">
          {loadinglocalization.loading}
        </p>
      ) : (
        <div className="h-[14rem] ml-6">
          <div className="grid grid-cols-3 gap-32 my-8 px-20">
            <div className="bg-white shadow-xl py-12 rounded-xl">
              <div className="flex justify-center items-center gap-1">
                <FaCircle className="text-green-500" />
                <p>{adpanellocalization.products}:</p>
              </div>
              <p className="text-center mt-4">{products.total} {adpanellocalization.product}</p>
            </div>
            <div className="bg-white shadow-xl py-12 rounded-xl">
              <div className="flex justify-center items-center gap-1">
                <FaCircle className="text-red-500" />
                <p>{adpanellocalization.users}:</p>
              </div>
              <p className="text-center mt-4">{users.total} {adpanellocalization.user}</p>
            </div>
            <div className="bg-white shadow-xl py-12 rounded-xl">
              <div className="flex justify-center items-center gap-1">
                <FaCircle className="text-blue-500" />
                <p>{adpanellocalization.orders}:</p>
              </div>
              <p className="text-center mt-4">{orders.total} {adpanellocalization.order}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <OrderPieChart chartData={chartData} />
            <Calendar />
          </div>
        </div>
      )}
    </div>
  );
}

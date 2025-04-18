'use client';

import { useEffect, useState } from 'react';
import { GetOrders } from '@/services/getOrders/getOrders';
import OrderPieChart from '@/components/AdPanel/OrderPieChart/OrderPieChart';
import Calendar from './Calendar/Calendar';
import { loadinglocalization } from '@/constants/localization/localization';
import HeoBaner from './HeroBaner/HeroBaner';
export default function AdPanel() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const orders = await GetOrders();
      setData(orders);
      setLoading(false);
    };
    fetchData();
  }, []);

  const deliveredCount = data.filter(order => order.deliveryStatus).length;
  const notDeliveredCount = data.filter(order => !order.deliveryStatus).length;

  const chartData = [
    { name: 'تحویل داده شده', value: deliveredCount },
    { name: 'در انتظار تحویل', value: notDeliveredCount },
  ];

  return (
    <div className='-mr-3'>
      {loading ? (
        <p className="text-center text-gray-500">
          {loadinglocalization.loading}
        </p>
      ) : (
        <div className="h-[14rem] ml-6">
          <HeoBaner />
          <div className="flex justify-between items-center mt-5 ">
            <OrderPieChart chartData={chartData} />
            <Calendar />
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GetOrders } from '@/services/getOrders/getOrders';
import {
  addproductlocalization,
  loadinglocalization,
  orderslocalization,
} from '@/constants/localization/localization';
import ModalOrders, { Iorders } from './ModalOrders/ModalOrders';

type ProductTableProps = {
  rowsPerPage?: number;
};

export default function Orders({ rowsPerPage = 8 }: ProductTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'delivered' | 'notDelivered'>(
    'all'
  );
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState<Iorders | null>(null);


  const deliveredCount = data.filter(order => order.deliveryStatus).length;
  const notDeliveredCount = data.filter(order => !order.deliveryStatus).length;

  const chartData = [
    { name: orderslocalization.delivered , value: deliveredCount },
    { name: orderslocalization.notdelivered, value: notDeliveredCount },
  ];


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const orders = await GetOrders();
      const orderData = orders;
      if (orderData) {
        setData(orderData);
      } else {
        console.log('No orders found or invalid data structure');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;

  const filteredOrders = data.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'delivered') return order.deliveryStatus === true;
    if (filter === 'notDelivered') return order.deliveryStatus === false;
  });

  const paginatedData = filteredOrders.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  
 const handleOpenModal = (order: Iorders) => {
   setSelectedOrder(order);
   setIsModalOpen(true);
 };


  const getPageNumbers = () => {
    const range = [];
    const maxPagesToShow = 3;
    let start = Math.max(page - 1, 1);
    let end = Math.min(start + maxPagesToShow - 1, totalPages);
    if (end - start < maxPagesToShow - 1) {
      start = Math.max(end - maxPagesToShow + 1, 1);
    }
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">
          {loadinglocalization.loading}
        </p>
      ) : (
        <div className="font-sahel">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{orderslocalization.managment}</p>
            <div className="flex justify-end px-2 gap-4 my-4">
              <select
                className="border border-custom-300 rounded-md px-3 py-1 text-sm font-sahel"
                value={filter}
                onChange={e => setFilter(e.target.value as any)}
              >
                <option value="all">{orderslocalization.all}</option>
                <option value="delivered">
                  {orderslocalization.delivered}
                </option>
                <option value="notDelivered">
                  {orderslocalization.notdelivered}
                </option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto rounded-[2rem] border border-custom-500 bg-gradient-to-br from-custom-100 via-white to-custom-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] py-6 px-3 -mr-5 space-y-4 transition-all">
            <div className="overflow-hidden rounded-xl border border-custom-500 shadow-inner backdrop-blur-md">
              <table className="min-w-full text-sm font-medium">
                <thead className="bg-custom-400 text-xs uppercase font-sahel tracking-wider">
                  <tr className="transition-all duration-300">
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {orderslocalization.name}
                    </th>
                    <th className="px-6 py-4 text-center font-number whitespace-nowrap">
                      {orderslocalization.price}
                    </th>
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {orderslocalization.Dateofregistration}
                    </th>
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {orderslocalization.statusdelivered}
                    </th>
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {orderslocalization.managmentordr}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-custom-500 bg-white font-sahel text-sm font-medium">
                  {paginatedData.map((order, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gradient-to-r hover:from-white hover:to-custom-50 transition-colors duration-300 ease-in-out hover:shadow-sm"
                    >
                      <td className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {order.user.firstname} {order.user.lastname}
                      </td>
                      <td className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {order.totalPrice.toLocaleString()}{' '}
                        {addproductlocalization.toman}
                      </td>
                      <td className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                      </td>
                      <td className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {order.deliveryStatus
                          ? 'تحویل داده شده'
                          : 'در انتظار تحویل'}
                      </td>
                      <td className="py-4 px-1 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleOpenModal(order)}
                          className="text-blue-500 hover:underline"
                        >
                          {orderslocalization.review}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row font-number items-center justify-between text-sm gap-3">
              <span className="text-xs px-2">
                {orderslocalization.showorder} <b>{startIndex + 1}</b> تا{' '}
                <b>
                  {Math.min(startIndex + rowsPerPage, filteredOrders.length)}
                </b>{' '}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="p-2 rounded-full bg-white border-2 border-custom-500 hover:bg-custom-400 disabled:opacity-40 transition-all duration-300"
                >
                  <FaChevronRight className="w-3 h-3" />
                </button>

                {getPageNumbers().map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-1.5 rounded-xl border-2 text-xs font-semibold shadow-md transition-all duration-300 ease-in-out
                ${
                  page === pageNum
                    ? 'bg-custom-400 text-white border-custom-500 scale-105'
                    : 'bg-white border-custom-500 hover:bg-custom-200 hover:scale-[1.05]'
                }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="p-2 rounded-full bg-white border-2 border-custom-500 hover:bg-custom-400 disabled:opacity-40 transition-all duration-300"
                >
                  <FaChevronLeft className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedOrder && (
        <ModalOrders
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          onSuccess={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from 'react-icons/fa';
import { GetProducts } from '@/services/getProducts/getProducts';
import {
  addproductlocalization,
  tablelocalization,
} from '@/constants/localization/localization';
import Button from '@/shared/Button/Button';

type ProductTableProps = {
  rowsPerPage?: number;
};

export default function ProductQuallity({ rowsPerPage = 8 }: ProductTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const products = await GetProducts();
      setData(products);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

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
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : (
        <div className="font-sahel">
          <div className="flex justify-end px-8">
            <Button
              children={tablelocalization.save}
              className="my-3 py-2 px-8 rounded-lg bg-custom-200 active:scale-90"
            />
          </div>
          <div className="overflow-x-auto rounded-[2rem] border border-custom-500 bg-gradient-to-br from-custom-100 via-white to-custom-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] py-6 px-3 -mr-9 space-y-4 transition-all">
            <div className="overflow-hidden rounded-xl border border-custom-500 shadow-inner backdrop-blur-md">
              <table className="min-w-full text-sm font-medium">
                <thead className="bg-custom-400 text-xs uppercase font-sahel tracking-wider">
                  <tr className="transition-all duration-300">
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {addproductlocalization.name}
                    </th>
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {addproductlocalization.quantity}
                    </th>
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {addproductlocalization.price}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-custom-500 bg-white font-sahel text-sm font-medium">
                  {paginatedData.map((product, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gradient-to-r hover:from-white hover:to-custom-50 transition-colors duration-300 ease-in-out hover:shadow-sm"
                    >
                      <td className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {product.name}
                      </td>
                      <td className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {product.quantity}
                      </td>
                      <td className="py-4 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {product.price.toLocaleString()} تومان
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-3">
              <span className="text-xs">
                نمایش <b>{startIndex + 1}</b> تا{' '}
                <b>{Math.min(startIndex + rowsPerPage, data.length)}</b> از{' '}
                <b>{data.length}</b>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="p-2 rounded-full bg-white border-2 border-custom-500 hover:bg-custom-400 disabled:opacity-40 transition-all duration-300"
                >
                  <FaChevronLeft className="w-3 h-3" />
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
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

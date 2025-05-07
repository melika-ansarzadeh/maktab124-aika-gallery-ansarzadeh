'use client';

import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  addproductlocalization,
  loadinglocalization,
  swallLocalization,
  tablelocalization,
} from '@/constants/localization/localization';
import Button from '@/shared/Button/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetProducts } from '@/services/getProducts/getProducts';
import { editProduct } from '@/services/editProduct/editProduct';

type ProductTableProps = {
  rowsPerPage?: number;
};

export default function ProductQuallity({
  rowsPerPage = 6,
}: ProductTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: string;
  } | any>(null);
  const [editedValue, setEditedValue] = useState<{ [key: string]: any }>({});
  const [changedCells, setChangedCells] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isEditing, setIsEditing] = useState(false);

 const fetchData = async (sortOption = '') => {
   setLoading(true);
   const products = await GetProducts({ sort: sortOption });
   setData(products);
   setLoading(false);
 };


  useEffect(() => {
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

  const handleEditClick = (id: string, field: string, value: any) => {
    setEditingCell({ id, field });
    setEditedValue(prev => ({
      ...prev,
      [`${id}-${field}`]: value,
    }));
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditedValue(prev => ({
      ...prev,
      [`${editingCell?.id}-${editingCell?.field}`]: value,
    }));

    setChangedCells(prev => ({
      ...prev,
      [`${editingCell?.id}-${editingCell?.field}`]: true,
    }));
  };

  const handleSaveAll = async () => {
    try {
      const changes = Object.keys(changedCells).filter(
        key => changedCells[key]
      );

      for (const key of changes) {
        const [id, field] = key.split('-');
        const value = editedValue[key];
        await editProduct(id, { [field]: value });
      }

      toast.success(swallLocalization.editedSuccessfully);
      setChangedCells({});
      setEditingCell(null);
      setEditedValue({});
      setIsEditing(false);
      await fetchData(); 
    } catch (error) {
      console.error('Failed to save all changes', error);
      toast.error(swallLocalization.errorInEditing);
    }
  };

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <p className="text-center font-sahel text-sm text-gray-500">{loadinglocalization.loading}</p>

      ) : (
        <div className="font-sahel">
          <div className="flex justify-between items-center pl-3">
            <p className="font-semibold">
              {addproductlocalization.managmentpricestock}
            </p>
            <Button
              onClick={handleSaveAll}
              children={tablelocalization.save}
              className="my-3 py-2 px-8 rounded-lg border bg-white border-custom-300 active:scale-90"
            />
          </div>
          <div className="overflow-x-auto rounded-[2rem] border font-number border-custom-500 bg-gradient-to-br from-custom-100 via-white to-custom-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)] py-6 px-3 -mr-5 space-y-4 transition-all">
            <div className="overflow-hidden rounded-xl border border-custom-500 shadow-inner backdrop-blur-md">
              <table className="min-w-full text-sm font-medium">
                <thead className="bg-custom-400 text-xs uppercase font-sahel tracking-wider">
                  <tr className="transition-all duration-300">
                    <th className="px-6 py-4 text-center whitespace-nowrap">
                      {addproductlocalization.name}
                    </th>
                    <th className="px-6 py-4 text-center font-num whitespace-nowrap">
                      {addproductlocalization.quantity}
                    </th>
                    <th className="px-6 py-4 text-center font-num whitespace-nowrap">
                      {addproductlocalization.price}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-custom-500 bg-white font-sahel text-sm font-medium">
                  {paginatedData.map(product => (
                    <tr
                      key={product._id}
                      className="hover:bg-gradient-to-r hover:from-white hover:to-custom-50 transition-colors duration-300 ease-in-out hover:shadow-sm"
                    >
                      <td className="py-6 px-1 text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                        {product.name}
                      </td>
                      <td
                        className={`py-4 px-1 text-center whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis cursor-pointer ${
                          changedCells[`${product._id}-quantity`]
                            ? 'bg-yellow-100'
                            : ''
                        }`}
                        onClick={() =>
                          handleEditClick(
                            product._id,
                            'quantity',
                            product.quantity
                          )
                        }
                      >
                        {editingCell?.id === product._id &&
                        editingCell.field === 'quantity' ? (
                          <input
                            type="text"
                            className="w-20 py-1 text-center border border-gray-300 rounded"
                            value={
                              editedValue[`${product._id}-quantity`] ??
                              product.quantity
                            }
                            onChange={handleChange}
                          />
                        ) : (
                          editedValue[`${product._id}-quantity`] ??
                          product.quantity
                        )}
                      </td>

                      <td
                        className={`py-4 px-1 text-center whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis cursor-pointer ${
                          changedCells[`${product._id}-price`]
                            ? 'bg-yellow-100'
                            : ''
                        }`}
                        onClick={() =>
                          handleEditClick(product._id, 'price', product.price)
                        }
                      >
                        {editingCell?.id === product._id &&
                        editingCell.field === 'price' ? (
                          <input
                            type="text"
                            className="w-20 py-1 text-center border border-gray-300 rounded"
                            value={
                              editedValue[`${product._id}-price`] ??
                              product.price
                            }
                            onChange={handleChange}
                          />
                        ) : (
                          <>
                            {(
                              editedValue[`${product._id}-price`] ??
                              product.price
                            ).toLocaleString()}{' '}
                            {addproductlocalization.toman}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between text-sm gap-3">
              <span className="text-xs px-2">
                {addproductlocalization.show} <b>{startIndex + 1}</b>تا{' '}
                <b>{Math.min(startIndex + rowsPerPage, data.length)}</b>{' '}
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
    </div>
  );
}

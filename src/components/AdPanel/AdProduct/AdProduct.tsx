'use client';

import {
  addproductlocalization,
  adproductlocalization,
  loadinglocalization,
} from '@/constants/localization/localization';
import { useEffect, useState } from 'react';

import { GetProducts } from '@/services/getProducts/getProducts';
import { Iaddproducts } from '@/services/addProduct/addProduct';
import ModalAdd from './ModalAdd/ModalAdd';
import Table from '../Table/Table';

export default function AdProduct() {
  // const [products, setProducts] = useState<any[]>([]);
  const [products, setProducts] = useState<Iaddproducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const columns = [
    {
      key: 'name',
      title: addproductlocalization.name,
      render: (v: any) => v || '—',
    },
    {
      key: 'brand',
      title: addproductlocalization.brand,
      render: (v: any) => v || '—',
    },
    {
      key: 'price',
      title: addproductlocalization.price,
      render: (v: number) => `${v.toLocaleString()} تومان`,
    },
    {
      key: 'quantity',
      title: addproductlocalization.quantity,
      render: (v: number) => v,
    },
    {
      key: 'stock',
      title: addproductlocalization.stock,
      render: (v: string) => v,
    },
    {
      key: 'material',
      title: addproductlocalization.material,
      render: (v: string) => v || '—',
    },
    {
      key: 'made',
      title: addproductlocalization.made,
      render: (v: string) => v || '—',
    },
    {
      key: 'decorations',
      title: addproductlocalization.decoration,
      render: (v: any) => v || '—',
    },
    {
      key: 'description',
      title: addproductlocalization.description,
      render: (v: string) => v || '—',
    },
    {
      key: 'category',
      title: addproductlocalization.category,
      render: (_: any, row: any) => row.category?.name || '—',
    },
    {
      key: 'subcategory',
      title: addproductlocalization.subcategory,
      render: (_: any, row: any) => row.subcategory?.name || '—',
    },
    {
      key: 'images',
      title: addproductlocalization.image,
      render: (value: string[] | string) => {
        const imageUrl = Array.isArray(value) ? value[0] : value;
        return (
          <img
            src={`http://${imageUrl}`}
            alt="image"
            className="h-12 w-12 object-cover rounded-lg mx-auto"
          />
        );
      },
    },
  ];

  const fetchProductsWithFilter = async (filter: string) => {
    try {
      setLoading(true);
      const data = await GetProducts(filter);
      setProducts(data);
    } catch (err) {
      console.error('خطا در گرفتن محصولات:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsWithFilter(sortOption);
  }, [sortOption]);

  const handleProductAdded = () => {
    fetchProductsWithFilter(sortOption);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between pl-2 font-number items-center">
        <div className="flex items-center gap-3 -mr-5 mb-5 font-sahel">
          <p className="font-semibold">{adproductlocalization.sort}:</p>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className="px-3 py-2 rounded-lg border"
          >
            <option value="createdAt">{adproductlocalization.oldest}</option>
            <option value="-createdAt">{adproductlocalization.newest}</option>
            <option value="-price">{adproductlocalization.expensive}</option>
            <option value="price">{adproductlocalization.cheap}</option>
          </select>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-sm border-2 border-custom-400 px-6 py-3 rounded-lg active:scale-95"
        >
          {adproductlocalization.addproduct}
        </button>
        <ModalAdd
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-500">
          {loadinglocalization.loading}
        </p>
      ) : (
        <Table
          columns={columns}
          products={products}
          setProducts={setProducts}
          rowsPerPage={5}
          isDelete={isDelete}
          setIsDelete={setIsDelete}
        />
      )}
    </div>
  );
}

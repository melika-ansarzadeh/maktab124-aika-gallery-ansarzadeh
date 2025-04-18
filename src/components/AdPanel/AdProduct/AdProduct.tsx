'use client';

import { useEffect, useState } from 'react';
import { addproductlocalization, loadinglocalization } from '@/constants/localization/localization';
import { GetProducts } from '@/services/getProducts/getProducts';
import { Iaddproducts } from '@/services/addProduct/addProduct';
import Table from '../Table/Table';


export default function AdProduct() {
  const [products, setProducts] = useState<Iaddproducts[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await GetProducts();
        setProducts(data);
        console.log(data);
      } catch (err) {
        console.error('خطا در گرفتن محصولات:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center font-sahel text-xs text-gray-500">
          {loadinglocalization.loading}
        </p>
      ) : (
        <Table columns={columns} data={products} rowsPerPage={5} />
      )}
    </div>
  );
}

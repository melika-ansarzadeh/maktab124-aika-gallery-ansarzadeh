'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Iaddproducts } from '@/services/addProduct/addProduct';

import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { GetSingleProduct } from '@/services/singleProduct/singleProduct';
import { singlelocalization } from '@/constants/localization/localization';


export default function Page() {
  const { id } = useParams();
  const [product, setProduct] = useState<Iaddproducts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await GetSingleProduct(id as string);
          setProduct(data);
          console.log(data);
        } catch (error) {
          console.error('خطا در دریافت محصول:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) return <p className="text-center py-10">{singlelocalization.loading}</p>;
  if (!product) return <p className="text-center py-10">{singlelocalization.notfound}</p>;

  return (
    <div className="container mx-auto font-sahel">
      <div className="grid grid-cols-[30%,70%] items-start gap-5">
        <div className="bg-white p-6 flex justify-center">
          <img
            src={`http://${product.images}`}
            alt={product.name}
            className="w-[28rem] h-[28rem] object-contain rounded-md m"
          />
        </div>

        <div className="flex flex-col gap-4 text-right pt-11 ml-20 mb-10">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-custom-500 font-number text-lg">
            {Number(product.price).toLocaleString()} تومان
          </p>
          <p className="text-base leading-relaxed">
            {singlelocalization.materia} : {product.material}
          </p>
          <p className="text-base leading-relaxed">
            {singlelocalization.decoration} {product.decorations}
          </p>
          <p className="text-base">
            {singlelocalization.brand} : {product.brand}
          </p>
          <p className="text-base">{product.made}</p>
          <p
            className={`text-base font-medium ${
              product.stock === 'موجود'
                ? 'text-green-600'
                : product.stock === 'نا موجود'
                ? 'text-red-600'
                : product.stock === 'به زودی'
                ? 'text-yellow-600'
                : product.stock === 'متوقف شده'
                ? 'text-gray-500'
                : 'text-black'
            }`}
          >
            {product.stock}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed -mb-1">
            {singlelocalization.category} :{product.category?.name || '—'}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed -mt-3">
            {singlelocalization.subcategory} :{product.subcategory?.name || '—'}
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-custom-500 hover:bg-custom-600 text-white px-6 py-3 rounded">
             {singlelocalization.addtocart} <IoCartOutline className="inline mr-2" />
            </button>
            <button className="text-custom-500 hover:text-custom-600 border border-custom-500 px-6 py-3  rounded">
             {singlelocalization.addtofavorit} <IoHeartOutline className="inline mr-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

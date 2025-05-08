'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Iaddproducts } from '@/services/addProduct/addProduct';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { GetSingleProduct } from '@/services/singleProduct/singleProduct';
import { singlelocalization } from '@/constants/localization/localization';
import { BASE_URL } from '@/constants/api/api';
import { useParams, useRouter } from 'next/navigation';
import SkeletonSingleProduct from './Skeleton/Skeleton';
import { useDispatch } from 'react-redux';
import { addItem } from '@/components/redux/reducers/cartReducer';

export default function SingleProduct() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Iaddproducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Iaddproducts[]>([]);
  const [showAllRelated, setShowAllRelated] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const data = await GetSingleProduct(id as string);
          setProduct(data);
        } catch (error) {
          console.error('error', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (typeof product?.category === 'object' && product?.category?._id) {
        try {
          const response = await axios.get(
            `${BASE_URL}/api/products?category=${product.category._id}`
          );
          const related = response.data.data.products.filter(
            (p: Iaddproducts) => p._id !== product._id
          );
          setRelatedProducts(related);
        } catch (error) {
          console.error('error', error);
        }
      } else {
        console.log('No valid category');
      }
    };

    if (product?.category) {
      fetchRelated();
    }
  }, [product]);

  const handleProductClick = (productId?: string) => {
    if (productId) {
      router.push(`/products/${productId}`);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image:`http://${product.images}`,
          quantity: 1,
        })
      );
    }
  };

  if (loading) return <SkeletonSingleProduct />;
  if (!product)
    return <p className="text-center py-10">{singlelocalization.notfound}</p>;

  return (
    <div className="container mx-auto font-sahel">
      <div className="grid grid-cols-[30%,70%] items-start gap-5">
        <div className="bg-white p-6 flex justify-center">
          <img
            src={`http://${product.images}`}
            alt={product.name}
            className="w-[28rem] h-[28rem] object-contain rounded-md"
          />
        </div>

        <div className="flex flex-col gap-4 text-right pt-11 ml-20 mb-10">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-custom-500 font-number text-lg">
            {Number(product.price).toLocaleString()} {singlelocalization.toman}
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
            {singlelocalization.subcategory} :{' '}
            {typeof product.subcategory === 'object'
              ? product.subcategory.name
              : '—'}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-custom-500 text-white px-6 py-3 rounded active:scale-95"
            >
              {singlelocalization.addtocart}{' '}
              <IoCartOutline className="inline mr-2" />
            </button>
            <button className="text-custom-500 hover:text-custom-600 border border-custom-500 px-6 py-3 rounded">
              {singlelocalization.addtofavorit}{' '}
              <IoHeartOutline className="inline mr-2" />
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="px-8 pb-8">
          <h2 className="text-xl font-bold mb-4">
            {singlelocalization.relatedProducts}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(showAllRelated
              ? relatedProducts
              : relatedProducts.slice(0, 4)
            ).map(item => (
              <div
                key={item._id}
                className="border p-3 rounded shadow-sm"
                onClick={() => handleProductClick(item._id)}
              >
                <img
                  src={`http://${item.images}`}
                  alt={item.name}
                  className="w-full object-cover rounded"
                />
                <h3 className="mt-5 mb-2 text-sm font-semibold">{item.name}</h3>
                <p className="text-custom-500 font-number text-sm">
                  {Number(item.price).toLocaleString()}{' '}
                  {singlelocalization.toman}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedProducts.length > 4 && (
        <div className="text-center ml-10">
          <button
            onClick={() => setShowAllRelated(prev => !prev)}
            className="text-custom-500 hover:underline text-sm"
          >
            {showAllRelated ? singlelocalization.less : singlelocalization.more}
          </button>
        </div>
      )}
    </div>
  );
}

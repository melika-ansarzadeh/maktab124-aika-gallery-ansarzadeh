'use client';

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard/ProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FilterProduct from './FilterProducts/FilterProducts';
import { GetProducts } from '@/services/getProducts/getProducts';
import { Iaddproducts } from '@/services/addProduct/addProduct';
import { useSearchParams } from 'next/navigation';
import SkeletonProductList from './Skeleton/Skeleton';


export default function Product() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Iaddproducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryFilters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      queryFilters[key] = value;
    });
    setFilters(queryFilters);
  }, [searchParams]);



  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

 useEffect(() => {
   const getProducts = async () => {
     setLoading(true);
     try {
       const data = await GetProducts(filters);
       setProducts(data);
       setCurrentPage(1); 
     } catch (err) {
       console.error('خطا در گرفتن محصولات:', err);
     } finally {
       setLoading(false);
     }
   };

   getProducts();
 }, [filters]);


  return (
    <div className="p-6 font-sahel grid grid-cols-[17%,80%]">
      <aside className="md:col-span-1">
        <FilterProduct setFilters={setFilters} />
      </aside>
      <div className="grid grid-cols-1 gap-8 pr-12">
        <section className="md:col-span-3 flex flex-col gap-10">
          <h1 className="text-2xl font-bold">محصولات</h1>

          {loading ? (
            <SkeletonProductList />
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">محصولی یافت نشد.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map(product => (
                  <ProductCard
                    key={product._id}
                    data={product}
                    product={{
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      image: `http://${product.images}`,
                    }}
                  />
                ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 pl-64 ">
            <button onClick={() => handlePageChange(currentPage - 1)}>
              <FaChevronRight />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-8 text-sm transition ${
                    isActive
                      ? 'bg-custom-500 text-white'
                      : 'text-custom-500 hover:bg-custom-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button onClick={() => handlePageChange(currentPage + 1)}>
              <FaChevronLeft />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

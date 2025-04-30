'use client';

import { useState } from 'react';
import ProductCard from './ProductCard/ProductCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FilterProduct from './FilterProducts/FilterProducts';

export default function Product() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  

  return (
    <div className="p-6 font-sahel grid grid-cols-[17%,80%]">
      <aside className="md:col-span-1">
        <FilterProduct />
      </aside>
      <div className="grid grid-cols-1 gap-8 pr-12 ">
        <section className="md:col-span-3 flex flex-col gap-10">
        <h1 className="text-2xl font-bold">محصولات</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCard key={i + currentPage * 10} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2">
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

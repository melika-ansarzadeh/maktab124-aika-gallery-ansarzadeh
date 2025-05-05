'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { filterlocalization } from '@/constants/localization/localization';

interface FilterProductProps {
  setFilters: (filters: any) => void;
}

export default function FilterProduct({ setFilters }: FilterProductProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname); // حذف همه queryها
  };

  if (!isClient) return null;

  return (
    <aside className="bg-custom-50 border border-custom-200 h-[54rem] p-5 shadow-sm text-sm font-sahel">
      <div>
        <button
          onClick={resetFilters}
          className="py-2 text-red-500 rounded"
        >
          {filterlocalization.reset}
        </button>
      </div>
      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-3">
        {filterlocalization.category}:
      </h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button
          onClick={() => updateFilter('category', '67fdfc76079f27c844bfb86e')}
        >
          {filterlocalization.necklace}
        </button>
        <button
          onClick={() => updateFilter('category', '67fdfc90079f27c844bfb872')}
        >
          {filterlocalization.earings}
        </button>
        <button
          onClick={() => updateFilter('category', '67fdfc52079f27c844bfb86a')}
        >
          {filterlocalization.ring}
        </button>
        <button
          onClick={() => updateFilter('category', '67fdfcac079f27c844bfb876')}
        >
          {filterlocalization.bracelet}
        </button>
      </div>

      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">
        {filterlocalization.brand}:
      </h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button onClick={() => updateFilter('brand', 'Bvlgari')}>
          {filterlocalization.bvlgari}
        </button>
        <button onClick={() => updateFilter('brand', 'Tiffany')}>
          {filterlocalization.tifany}
        </button>
        <button onClick={() => updateFilter('brand', 'Cartier')}>
          {filterlocalization.cartier}
        </button>
        <button onClick={() => updateFilter('brand', 'Versace')}>
          {filterlocalization.versace}
        </button>
        <button onClick={() => updateFilter('brand', 'Dior')}>
          {filterlocalization.dior}
        </button>
        <button onClick={() => updateFilter('brand', 'Chanel')}>
          {filterlocalization.chanel}
        </button>
      </div>

      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">
        {filterlocalization.price}:
      </h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button onClick={() => updateFilter('sort', '-price')}>
          {filterlocalization.expensive}
        </button>
        <button onClick={() => updateFilter('sort', 'price')}>
          {filterlocalization.cheap}
        </button>
      </div>
    </aside>
  );
}
